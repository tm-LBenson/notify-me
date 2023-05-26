// Header/index.js

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '@/config/firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../Auth/AuthContext';
import Hamburger from 'hamburger-react';
export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsOpen(window.innerWidth >= 769);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNav = () => {
    if (windowWidth < 769) {
      setIsOpen(!isOpen);
    }
  };

  const router = useRouter();

  const hideLoginLink = router.pathname === '/login';
  const hideSignupLink = router.pathname === '/signup';

  const user = currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <Link href="/">Home</Link>
      <div
        className="hamburger-menu"
        onClick={toggleNav}
      >
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
        />
      </div>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <div className="btnCont">
          {!user && !hideSignupLink && (
            <Link
              href="/signup"
              className="link"
            >
              Signup
            </Link>
          )}
          {!user && !hideLoginLink && (
            <Link
              href="/login"
              className="link"
            >
              Login
            </Link>
          )}


          {user && (
            <button
              onClick={handleLogout}
              className="button"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );

}
