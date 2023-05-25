import React, { createContext, useState, useEffect } from 'react';
import { auth } from '@src/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@src/config/firebase';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [additionalUserData, setAdditionalUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setAdditionalUserData(userDoc.data());
        }
      } else {
        setAdditionalUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue = { currentUser, ...additionalUserData };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
