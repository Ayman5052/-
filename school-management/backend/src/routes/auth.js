import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function authRouter(db) {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const hash = await bcrypt.hash(password, 10);
    try {
      const result = await db.run(
        'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [fullName, email, hash, role]
      );
      return res.status(201).json({ id: result.lastID, email, role });
    } catch {
      return res.status(409).json({ message: 'Email already exists' });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, fullName: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ token, user: { id: user.id, role: user.role, fullName: user.full_name } });
  });

  return router;
}
