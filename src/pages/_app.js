
import { AuthProvider } from '@src/components/Auth/AuthContext';
import '@src/styles/sass/main.scss';

export default function App({ Component, pageProps }) {

  return(

<AuthProvider>
     <Component {...pageProps} />;)
</AuthProvider>

  )
}
