import { useEffect, useState } from 'react';
import { api, setToken } from '../api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [className, setClassName] = useState('الصف الأول أ');
  const [gradeLevel, setGradeLevel] = useState('Grade 1');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      api.get('/admin/dashboard').then((res) => setStats(res.data));
    }
  }, []);

  const createClass = async (e) => {
    e.preventDefault();
    await api.post('/admin/classes', { name: className, gradeLevel });
    alert('تم إنشاء الفصل بنجاح');
  };

  if (!stats) return <p className="loading">جاري تحميل لوحة التحكم...</p>;

  return (
    <main className="container">
      <h1>لوحة تحكم المدير</h1>
      <section className="stats-grid">
        <div className="card">عدد الطلاب: {stats.students}</div>
        <div className="card">عدد المعلمين: {stats.teachers}</div>
        <div className="card">عدد الفصول: {stats.classes}</div>
        <div className="card">الواجبات الحالية: {stats.assignments}</div>
      </section>

      <form className="card" onSubmit={createClass}>
        <h2>إنشاء فصل دراسي</h2>
        <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="اسم الفصل" />
        <input value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} placeholder="المرحلة" />
        <button type="submit">حفظ</button>
      </form>
    </main>
  );
}
