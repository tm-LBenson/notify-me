// pages/login.js

import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Login from '@src/components/Auth/Login';
import { useRouter } from 'next/router';
import { AuthContext } from '@src/components/Auth/AuthContext';

export default function LoginPage() {
  const  {currentUser}  = useContext(AuthContext)
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {

      router.push('/tickets');
    }
  }, [currentUser, router]);
  return (
    <>
      <Head>
        <title>Login | Help Tickets</title>
        <meta
          name="description"
          content="Login to your Help Tickets account"
        />
      </Head>


      <main>
        <h1 className='heading'>Login to Your Account</h1>
        <Login />
      </main>

    </>
  );
}
