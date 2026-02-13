import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

export function teacherRouter(db) {
  const router = express.Router();
  router.use(authenticate, authorize('teacher'));

  router.post('/assignments', async (req, res) => {
    const { title, description, classId, dueDate, fileUrl } = req.body;
    const result = await db.run(
      `INSERT INTO assignments (title, description, class_id, teacher_id, due_date, file_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description || '', classId, req.user.id, dueDate || null, fileUrl || '']
    );
    res.status(201).json({ id: result.lastID });
  });

  router.post('/grades', async (req, res) => {
    const { studentId, classId, subject, score, maxScore, assessmentType } = req.body;
    const result = await db.run(
      `INSERT INTO grades (student_id, class_id, subject, score, max_score, teacher_id, assessment_type)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [studentId, classId, subject, score, maxScore || 100, req.user.id, assessmentType || 'assignment']
    );
    res.status(201).json({ id: result.lastID });
  });

  router.post('/attendance', async (req, res) => {
    const { classId, studentId, attendanceDate, status } = req.body;
    const result = await db.run(
      `INSERT INTO attendance (student_id, class_id, attendance_date, status, recorded_by)
       VALUES (?, ?, ?, ?, ?)`,
      [studentId, classId, attendanceDate, status, req.user.id]
    );
    res.status(201).json({ id: result.lastID });
  });

  router.post('/notifications', async (req, res) => {
    const { targetRole, targetUserId, title, message } = req.body;
    const result = await db.run(
      `INSERT INTO notifications (sender_id, target_role, target_user_id, title, message)
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, targetRole || null, targetUserId || null, title, message]
    );
    res.status(201).json({ id: result.lastID });
  });

  router.post('/materials', async (req, res) => {
    const { classId, title, fileUrl, fileType } = req.body;
    const result = await db.run(
      `INSERT INTO materials (teacher_id, class_id, title, file_url, file_type)
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, classId, title, fileUrl, fileType || 'pdf']
    );
    res.status(201).json({ id: result.lastID });
  });

  return router;
}
