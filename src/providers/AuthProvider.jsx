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


























// import { useEffect, useMemo, useState } from "react";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { app } from "../firebase/firebase.config";
// import { AuthContext } from "./AuthContext";
// import axios from "axios";

// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const API_URL = import.meta.env.VITE_API_URL

//   const createUser = async (email, password) => {
//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const firebaseUser = userCredential.user;

//       // backend e register koro MongoDB te
//       await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
//         email: firebaseUser.email,
//         displayName:
//           firebaseUser.displayName || firebaseUser.email.split("@")[0],
//       });

//       // JWT niye role set koro
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
//         email: firebaseUser.email,
//       });
//       localStorage.setItem("accessToken", res.data.token);
//       setRole(res.data.role);
//       setUser(firebaseUser);
//     } catch (err) {
//       console.error("Signup failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const signIn = async (email, password) => {
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const firebaseUser = userCredential.user;

//       // backend JWT and role
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
//         email: firebaseUser.email,
//       });
//       localStorage.setItem("accessToken", res.data.token);
//       setRole(res.data.role);
//       setUser(firebaseUser);
//     } catch (err) {
//       console.error("Login failed:", err);
//       setUser(null);
//       setRole(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const firebaseUser = result.user;

//       // register backend e (agar not exists)
//       await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
//         email: firebaseUser.email,
//         displayName:
//           firebaseUser.displayName || firebaseUser.email.split("@")[0],
//       });

//       // JWT fetch
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
//         email: firebaseUser.email,
//       });
//       localStorage.setItem("accessToken", res.data.token);
//       setRole(res.data.role);
//       setUser(firebaseUser);
//     } catch (err) {
//       console.error("Google Signin failed:", err);
//       setUser(null);
//       setRole(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//     setLoading(true); // start loading
//     if (currentUser) {
//       setUser(currentUser);
//       try {
//         const res = await axios.post(`${API_URL}/jwt`, { email: currentUser.email });
//         localStorage.setItem("accessToken", res.data.token);
//         setRole(res.data.role);
//       } catch (err) {
//         setRole(null);
//         localStorage.removeItem("accessToken");
//       }
//     } else {
//       setUser(null);
//       setRole(null);
//       localStorage.removeItem("accessToken");
//     }
//     setLoading(false); // ✅ set loading false only after all async tasks
//   });

//   return () => unsubscribe();
// }, [API_URL]);


//   useEffect(() => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     setLoading(true);
//     axios.post(`${API_URL}/validate-token`, { token })
//       .then(res => setUser(res.data.user))
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//   }
// }, [API_URL]);


//   const logOut = async () => {
//     setLoading(true);
//     return signOut(auth);
//   };
//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     });
//   };

//   const authInfo = useMemo(
//     () => ({
//       user,
//       role,
//       setUser,
//       loading,
//       setLoading,
//       createUser,
//       signIn,
//       signInWithGoogle,
//       logOut,
//       updateUserProfile,
//     }),
//     [user, role, loading]
//   );

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;
