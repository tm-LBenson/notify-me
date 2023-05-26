// Auth/Login.js
import React, { useState } from 'react';
import { auth, googleProvider } from '@/config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function login(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMessage('Invalid email format.');
          break;
        case 'auth/user-not-found':
          setErrorMessage('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Incorrect password.');
          break;
        default:
          setErrorMessage('An error occurred. Please try again.');
          console.error(error);
      }
    }
  }

  const loginWithGoogle = async () => {
    signInWithPopup(auth, googleProvider);
  };


  return (
    <>
      <form
        onSubmit={login}
        className="form"
      >
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button
          type="submit"
          className="button"
        >
          Login
        </button>
        <div className="divider"></div>
        <button
          type="button"
          onClick={loginWithGoogle}
          className='googleButtonClasses'
        >
          <Icon icon="devicon:google" />
          Login with Google
        </button>
      </form>
      <p className="text">
        Do not have an account? <Link href="/signup">Signup</Link>
      </p>
    </>
  );

}
