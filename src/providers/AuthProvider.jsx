import React, { useEffect, useState, useMemo } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import axiosSecure from "../api/AxiosSecure";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= REGISTER =================
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const { user: firebaseUser } =
        await createUserWithEmailAndPassword(auth, email, password);

      // save user in DB
      await axiosSecure.post("/register", {
        email: firebaseUser.email,
        displayName:
          firebaseUser.displayName || firebaseUser.email.split("@")[0],
      });

      // get JWT cookie
      const res = await axiosSecure.post("/jwt", {
        email: firebaseUser.email,
      });

      setUser(firebaseUser);
      setRole(res.data.role);
    } catch (err) {
      console.error("Create user error:", err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGIN =================
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { user: firebaseUser } =
        await signInWithEmailAndPassword(auth, email, password);

      const res = await axiosSecure.post("/jwt", {
        email: firebaseUser.email,
      });

      setUser(firebaseUser);
      setRole(res.data.role);
    } catch (err) {
      console.error("Login error:", err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { user: firebaseUser } =
        await signInWithPopup(auth, googleProvider);

      await axiosSecure.post("/register", {
        email: firebaseUser.email,
        displayName:
          firebaseUser.displayName || firebaseUser.email.split("@")[0],
      });

      const res = await axiosSecure.post("/jwt", {
        email: firebaseUser.email,
      });

      setUser(firebaseUser);
      setRole(res.data.role);
    } catch (err) {
      console.error("Google login error:", err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  // ================= AUTH STATE =================
  // ⚠️ NO /jwt call here (VERY IMPORTANT)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ================= LOAD USER ROLE DATA =================
 useEffect(() => {
  if (!user?.email) {
    setRoleData(null);
    setRole(null);
    return;
  }

  axiosSecure.get(`/users/${encodeURIComponent(user.email.toLowerCase())}`)
    .then(res => {
      setRoleData(res.data);
      setRole(res.data.role); // <-- important
    })
    .catch(err => {
      console.error("Role fetch error:", err);
      setRoleData({ role: "user", chefId: null });
      setRole("user"); // fallback
    });
}, [user]);




  // ================= LOGOUT =================
  const logOut = async () => {
    setLoading(true);
    try {
      await axiosSecure.post("/logout");
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setRole(null);
      setRoleData(null);
      setLoading(false);
    }
  };

  // ================= UPDATE PROFILE =================
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // ================= CONTEXT VALUE =================
  const authInfo = useMemo(
    () => ({
      user,
      role,
      roleData,
      loading,
      createUser,
      signIn,
      signInWithGoogle,
      logOut,
      updateUserProfile,
      setUser,
    }),
    [user, role, roleData, loading]
  );

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
