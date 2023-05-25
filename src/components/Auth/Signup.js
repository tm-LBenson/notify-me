import React, { useState } from 'react';
import { auth, googleProvider } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { db } from '@/config/firebase';

import {
  setDoc,
  doc,
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore';

export default function Signup() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function login(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const data = e.target.elements;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.value,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      const userDocRef = doc(db, 'users', user.uid);

      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        role: 'User',
      });
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMessage('Invalid email format.');
          break;
        case 'auth/weak-password':
          setErrorMessage('Password should be at least 6 characters.');
          break;
        case 'auth/email-already-in-use':
          setErrorMessage('Email already in use.');
          break;
        default:
          setErrorMessage('An error occurred. Please try again.');
          console.error(error);
      }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);

      const q = query(
        collection(db, 'users'),
        where('email', '==', user.email),
      );


      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,

          role: 'User',
        });
      } else {
        console.log('User already exists in Firestore');
      }
    } catch (error) {
      console.error('Error in Google Sign In: ', error.message);
    }
  };



  return (
    <>
      <form
        onSubmit={login}
        className="form"
      >
        <label
          htmlFor="firstName"
          className="label"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label
          htmlFor="lastName"
          className="label"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label
          htmlFor="email"
          className="label"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
        />

        <label
          htmlFor="password"
          className="label"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label
          htmlFor="confirmPassword"
          className="label"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button
          type="submit"
          className="button"
        >
          Signup
        </button>
        <div className="divider"></div>
        <button
          type="button"
          onClick={loginWithGoogle}
          className="googleButtonClasses"
        >
          <Icon icon="devicon:google" />
          Signup with Google
        </button>
      </form>
      <p className="text">
        Already signed up? <Link href="/login">Login</Link>
      </p>
    </>
  );

}
