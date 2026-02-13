import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

export function studentRouter(db) {
  const router = express.Router();
  router.use(authenticate, authorize('student'));

  router.get('/schedule', async (req, res) => {
    const rows = await db.all(
      `SELECT s.day_of_week, s.period, s.subject, s.room, u.full_name AS teacher
       FROM schedules s
       JOIN enrollments e ON e.class_id = s.class_id
       JOIN users u ON u.id = s.teacher_id
       WHERE e.student_id = ?
       ORDER BY s.day_of_week, s.period`,
      [req.user.id]
    );
    res.json(rows);
  });

  router.get('/assignments', async (req, res) => {
    const rows = await db.all(
      `SELECT a.* FROM assignments a
       JOIN enrollments e ON e.class_id = a.class_id
       WHERE e.student_id = ?
       ORDER BY a.due_date`,
      [req.user.id]
    );
    res.json(rows);
  });

  router.post('/assignments/:assignmentId/submit', async (req, res) => {
    const { assignmentId } = req.params;
    const { submittedFileUrl, notes } = req.body;
    const result = await db.run(
      'INSERT INTO submissions (assignment_id, student_id, submitted_file_url, notes) VALUES (?, ?, ?, ?)',
      [assignmentId, req.user.id, submittedFileUrl || '', notes || '']
    );
    res.status(201).json({ id: result.lastID });
  });

  router.get('/grades', async (req, res) => {
    const rows = await db.all('SELECT * FROM grades WHERE student_id = ?', [req.user.id]);
    res.json(rows);
  });

  router.get('/attendance', async (req, res) => {
    const rows = await db.all('SELECT * FROM attendance WHERE student_id = ? ORDER BY attendance_date DESC', [req.user.id]);
    res.json(rows);
  });

  router.get('/notifications', async (req, res) => {
    const rows = await db.all(
      'SELECT * FROM notifications WHERE target_user_id = ? OR target_role = ? ORDER BY created_at DESC',
      [req.user.id, 'student']
    );
    res.json(rows);
  });

  return router;
}
