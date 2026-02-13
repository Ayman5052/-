import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { initDb } from './db.js';

const db = await initDb();
const users = [
  { full_name: 'Admin User', email: 'admin@school.com', password: '123456', role: 'admin' },
  { full_name: 'Teacher User', email: 'teacher@school.com', password: '123456', role: 'teacher' },
  { full_name: 'Student User', email: 'student@school.com', password: '123456', role: 'student' }
];

for (const user of users) {
  const existing = await db.get('SELECT id FROM users WHERE email = ?', [user.email]);
  if (!existing) {
    const hash = await bcrypt.hash(user.password, 10);
    await db.run('INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)', [
      user.full_name,
      user.email,
      hash,
      user.role
    ]);
  }
}

const teacher = await db.get("SELECT id FROM users WHERE role='teacher' LIMIT 1");
const student = await db.get("SELECT id FROM users WHERE role='student' LIMIT 1");
let schoolClass = await db.get('SELECT id FROM classes LIMIT 1');
if (!schoolClass) {
  const result = await db.run('INSERT INTO classes (name, grade_level, homeroom_teacher_id) VALUES (?, ?, ?)', [
    'الصف الأول أ',
    'Grade 1',
    teacher.id
  ]);
  schoolClass = { id: result.lastID };
}

await db.run('INSERT OR IGNORE INTO enrollments (class_id, student_id) VALUES (?, ?)', [schoolClass.id, student.id]);
await db.run(
  'INSERT INTO schedules (class_id, day_of_week, period, subject, teacher_id, room) VALUES (?, ?, ?, ?, ?, ?)',
  [schoolClass.id, 'Sunday', 1, 'Mathematics', teacher.id, 'A-101']
);

console.log('Seed complete');
