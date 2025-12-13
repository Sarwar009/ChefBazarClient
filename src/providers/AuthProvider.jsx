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
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const API_URL = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // register in backend
      await axios.post(`${API_URL}/register`, {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email.split("@")[0],
      });

      // fetch JWT & role
      const res = await axios.post(`${API_URL}/jwt`, { email: firebaseUser.email });
      localStorage.setItem("accessToken", res.data.token);
      setRole(res.data.role);
      setUser(firebaseUser);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Sign in
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const res = await axios.post(`${API_URL}/jwt`, { email: firebaseUser.email });
      localStorage.setItem("accessToken", res.data.token);
      setRole(res.data.role);
      setUser(firebaseUser);
    } catch (err) {
      console.error(err);
      setUser(null);
      setRole(null);
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      await axios.post(`${API_URL}/register`, {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email.split("@")[0],
      });

      const res = await axios.post(`${API_URL}/jwt`, { email: firebaseUser.email });
      localStorage.setItem("accessToken", res.data.token);
      setRole(res.data.role);
      setUser(firebaseUser);
    } catch (err) {
      console.error(err);
      setUser(null);
      setRole(null);
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };

  // Auth state change
  useEffect(() => {
    setLoading(true); // start loading
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const res = await axios.post(`${API_URL}/jwt`, { email: currentUser.email });
          localStorage.setItem("accessToken", res.data.token);
          localStorage.setItem("userId", res.data._id);
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
      setLoading(false); // ✅ set loading false only after JWT fetch
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setRole(null);
    localStorage.removeItem("accessToken");
    setLoading(false);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
  };

  // roleData set
  useEffect(() => {
  if (user?.email) {
    axios.get(`${API_URL}/users/${user.email}`)
      .then(res => setRoleData(res.data));
  }
}, [user]);


  const authInfo = useMemo(() => ({
    user,
    role,
    loading,
    setUser,
    setRole,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }), [user, role, loading]);

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;


