import React, { useEffect, useState, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.init";

// Google Login Provider
const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, displayName = '') => {
    if (!auth) {
      const error = new Error('Firebase auth not initialized. Please check your .env.local file.');
      error.code = 'auth/not-initialized';
      return Promise.reject(error);
    }
    setLoading(true);
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName && displayName.trim()) {
        await updateProfile(userCredential.user, {
          displayName: displayName.trim()
        });
        console.log('✅ User display name updated:', displayName);
      }
      
      return userCredential;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const SignInUser = (email, password) => {
    if (!auth) {
      const error = new Error('Firebase auth not initialized. Please check your .env.local file.');
      error.code = 'auth/not-initialized';
      return Promise.reject(error);
    }
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    if (!auth) {
      const error = new Error('Firebase auth not initialized. Please check your .env.local file.');
      error.code = 'auth/not-initialized';
      return Promise.reject(error);
    }
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    if (!auth) {
      const error = new Error('Firebase auth not initialized. Please check your .env.local file.');
      error.code = 'auth/not-initialized';
      return Promise.reject(error);
    }
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    if (!auth) {
      console.warn('⚠️ Firebase auth not initialized. Authentication features will not work.');
      setLoading(false);
      return;
    }

    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("✅ User logged in:", currentUser.email);
      } else {
        console.log("ℹ️ User logged out");
      }
      setLoading(false);
    }, (error) => {
      console.error('❌ Auth state error:', error);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    SignInUser,
    signInWithGoogle,
    logOut,
    // Aliases for compatibility
    currentUser: user,
    signup: createUser,
    login: SignInUser,
    loginWithGoogle: signInWithGoogle,
    logout: logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
