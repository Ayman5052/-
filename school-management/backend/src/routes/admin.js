import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

export function adminRouter(db) {
  const router = express.Router();
  router.use(authenticate, authorize('admin'));

  router.get('/dashboard', async (_, res) => {
    const [students, teachers, classes, assignments] = await Promise.all([
      db.get("SELECT COUNT(*) AS total FROM users WHERE role = 'student'"),
      db.get("SELECT COUNT(*) AS total FROM users WHERE role = 'teacher'"),
      db.get('SELECT COUNT(*) AS total FROM classes'),
      db.get('SELECT COUNT(*) AS total FROM assignments')
    ]);
    res.json({ students: students.total, teachers: teachers.total, classes: classes.total, assignments: assignments.total });
  });

  router.post('/classes', async (req, res) => {
    const { name, gradeLevel, homeroomTeacherId } = req.body;
    const result = await db.run(
      'INSERT INTO classes (name, grade_level, homeroom_teacher_id) VALUES (?, ?, ?)',
      [name, gradeLevel, homeroomTeacherId || null]
    );
    res.status(201).json({ id: result.lastID });
  });

  router.post('/exams', async (req, res) => {
    const { title, classId, subject, examDate } = req.body;
    const result = await db.run(
      'INSERT INTO exams (title, class_id, subject, exam_date, created_by) VALUES (?, ?, ?, ?, ?)',
      [title, classId, subject, examDate, req.user.id]
    );
    res.status(201).json({ id: result.lastID });
  });

  router.get('/reports/attendance', async (_, res) => {
    const rows = await db.all(
      `SELECT class_id, attendance_date,
       SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present,
       SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) AS absent
       FROM attendance GROUP BY class_id, attendance_date`
    );
    res.json(rows);
  });

  router.get('/reports/results', async (_, res) => {
    const rows = await db.all(
      'SELECT class_id, subject, ROUND(AVG(score), 2) AS average_score FROM grades GROUP BY class_id, subject'
    );
    res.json(rows);
  });

  router.get('/users', async (_, res) => {
    const rows = await db.all('SELECT id, full_name, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  });

  return router;
}
