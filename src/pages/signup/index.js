// pages/login.js

import Head from 'next/head';

import Signup from '@src/components/Auth/Signup';

import { useContext, useEffect } from 'react';
import { AuthContext } from '@src/components/Auth/AuthContext';
import { useRouter } from 'next/router';
export default function SignupPage() {
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
        <title>Signup | Help Tickets</title>
        <meta
          name="description"
          content="Signup to create a Help Tickets account"
        />
      </Head>


      <main>
        <h1 className="heading">Sign up for an account</h1>
        <Signup />
      </main>

    </>
  );
}
