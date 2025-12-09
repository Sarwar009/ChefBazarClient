import { useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // backend e register koro MongoDB te
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        email: firebaseUser.email,
        displayName:
          firebaseUser.displayName || firebaseUser.email.split("@")[0],
      });

      // JWT niye role set koro
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: firebaseUser.email,
      });
      localStorage.setItem("accessToken", res.data.token);
      setRole(res.data.role);
      setUser(firebaseUser);
    } catch (err) {
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // backend JWT and role
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: firebaseUser.email,
      });
      localStorage.setItem("accessToken", res.data.token);
      setRole(res.data.role);
      setUser(firebaseUser);
    } catch (err) {
      console.error("Login failed:", err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // register backend e (agar not exists)
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        email: firebaseUser.email,
        displayName:
          firebaseUser.displayName || firebaseUser.email.split("@")[0],
      });

      // JWT fetch
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: firebaseUser.email,
      });
      localStorage.setItem("accessToken", res.data.token);
      setRole(res.data.role);
      setUser(firebaseUser);
    } catch (err) {
      console.error("Google Signin failed:", err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: currentUser.email,
          });
          localStorage.setItem("accessToken", res.data.token);
          setRole(res.data.role);
        } catch (err) {
          console.error(err);
          setRole(null);
          localStorage.removeItem("accessToken");
        }
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem("accessToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const authInfo = useMemo(
    () => ({
      user,
      role,
      setUser,
      loading,
      setLoading,
      createUser,
      signIn,
      signInWithGoogle,
      logOut,
      updateUserProfile,
    }),
    [user, role, loading]
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
