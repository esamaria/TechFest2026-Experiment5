# TechFest 2026 Backend

## 1. Requirements
- Node.js
- MongoDB Community Server
- MongoDB Compass

## 2. Install
```bash
cd techfest-backend
npm install
```

## 3. Configure
Edit `.env` if required:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/techfest
JWT_SECRET=change_this_to_a_long_random_secret
```

## 4. Insert sample events
```bash
npm run seed
```

## 5. Start server
```bash
npm start
```

API: http://localhost:5000

## Main endpoints
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/events`
- GET `/api/events/:id`
- POST `/api/events` (admin)
- PUT `/api/events/:id` (admin)
- DELETE `/api/events/:id` (admin)
- POST `/api/registrations` (login required)
- GET `/api/registrations/my` (login required)
- DELETE `/api/registrations/:id` (login required)
- GET `/api/registrations` (admin)

For protected requests use:
`Authorization: Bearer <JWT token>`
