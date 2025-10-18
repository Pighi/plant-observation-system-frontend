import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/context/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('student@school.edu');
  const [password, setPassword] = useState('studentpass');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      alert('Login failed: ' + (err?.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Plant Observation — Login</h2>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
