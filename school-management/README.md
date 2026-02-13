# نظام إدارة مدرسة متكامل (Web + Mobile + Backend)

مشروع نموذجي متكامل يتضمن:
- **Back-end** بـ Node.js + Express + SQLite
- **Web Admin Dashboard** بـ React (Vite)
- **Mobile App** (طلاب + معلمين) بـ React Native (Expo)

## 1) التشغيل السريع

### Back-end
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Web Admin
```bash
cd web-admin
npm install
npm run dev
```

### Mobile App
```bash
cd mobile-app
npm install
npm start
```

## 2) الأدوار المدعومة

### الطالب
- تسجيل / تسجيل دخول
- عرض الجدول الدراسي `GET /api/student/schedule`
- مشاهدة الواجبات والاختبارات
- إرسال واجب `POST /api/student/assignments/:assignmentId/submit`
- عرض الدرجات والحضور
- استقبال الإشعارات

### المعلم
- تسجيل / تسجيل دخول
- رفع واجب `POST /api/teacher/assignments`
- تسجيل الدرجات `POST /api/teacher/grades`
- تسجيل الحضور `POST /api/teacher/attendance`
- إرسال إشعارات `POST /api/teacher/notifications`
- رفع مواد تعليمية `POST /api/teacher/materials`

### المدير (الإدارة)
- لوحة تحكم ويب `GET /api/admin/dashboard`
- إدارة المستخدمين `GET /api/admin/users`
- إنشاء فصول `POST /api/admin/classes`
- جدولة امتحانات `POST /api/admin/exams`
- تقارير حضور ونتائج `GET /api/admin/reports/*`

## 3) روابط API الأساسية

- **Auth**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- **Student**
  - `GET /api/student/schedule`
  - `GET /api/student/assignments`
  - `POST /api/student/assignments/:assignmentId/submit`
  - `GET /api/student/grades`
  - `GET /api/student/attendance`
  - `GET /api/student/notifications`
- **Teacher**
  - `POST /api/teacher/assignments`
  - `POST /api/teacher/grades`
  - `POST /api/teacher/attendance`
  - `POST /api/teacher/notifications`
  - `POST /api/teacher/materials`
- **Admin**
  - `GET /api/admin/dashboard`
  - `GET /api/admin/users`
  - `POST /api/admin/classes`
  - `POST /api/admin/exams`
  - `GET /api/admin/reports/attendance`
  - `GET /api/admin/reports/results`

## 4) مثال تسجيل دخول مستخدم

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "123456"
}
```

## 5) مثال صفحة جدول الطالب
- في تطبيق الموبايل: `mobile-app/src/screens/StudentScheduleScreen.js`
- المصدر: `GET /api/student/schedule`

## 6) مثال رفع واجب من المعلم
- في تطبيق الموبايل: `mobile-app/src/screens/TeacherUploadScreen.js`
- API: `POST /api/teacher/assignments`

## 7) مثال لوحة تحكم المدير
- في الويب: `web-admin/src/pages/DashboardPage.jsx`
- API: `GET /api/admin/dashboard` + `POST /api/admin/classes`

## 8) قاعدة البيانات
- الملف: `backend/sql/schema.sql`
- تشمل الجداول: users, classes, enrollments, schedules, assignments, submissions, exams, grades, attendance, notifications, materials

## 9) الإشعارات الفورية
يمكن دمج FCM أو OneSignal بسهولة. حالياً يوجد **نظام إشعارات داخل النظام** عبر جدول `notifications` وواجهات إرسال/استقبال. يمكن إضافة Socket.IO أو FCM كطبقة Push حقيقية.
