import '../styles/globals.css';
import { AuthProvider } from '../src/context/auth';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
