import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import { authRouter } from './routes/auth.js';
import { studentRouter } from './routes/student.js';
import { teacherRouter } from './routes/teacher.js';
import { adminRouter } from './routes/admin.js';

const app = express();
app.use(cors());
app.use(express.json());

const db = await initDb();

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter(db));
app.use('/api/student', studentRouter(db));
app.use('/api/teacher', teacherRouter(db));
app.use('/api/admin', adminRouter(db));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
