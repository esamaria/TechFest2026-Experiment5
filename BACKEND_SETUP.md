# TechFest 2026 Portal – Experiment 4

The React frontend is integrated with the Node.js/Express/MongoDB backend in `techfest-backend`.

## Run

### Terminal 1 – MongoDB
Start MongoDB Community Server.

### Terminal 2 – Backend
```bash
cd techfest-backend
npm install
npm run seed
npm start
```

### Terminal 3 – React
From the project root:
```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Complete workflow
1. Open `/register` and create a user.
2. Open `/login` and log in.
3. Open `/events`; events are loaded from MongoDB through Express.
4. Click Register on an event; the JWT is sent automatically.
5. The backend creates a registration and decreases available seats.
6. Open My Registrations to view registered events.
7. Use MongoDB Compass to verify `users`, `events`, and `registrations`.
