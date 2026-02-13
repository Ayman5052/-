import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../api';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch {
      setError('بيانات تسجيل الدخول غير صحيحة');
    }
  };

  return (
    <main className="container">
      <form className="card" onSubmit={submit}>
        <h1>تسجيل دخول الإدارة</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد الإلكتروني" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="كلمة المرور" />
        <button type="submit">دخول</button>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}
