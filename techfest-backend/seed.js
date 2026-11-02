import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";

dotenv.config();

const events = [
  { name: "Coding Contest", category: "Technical", fee: 100, seats: 50, date: "2026-09-12" },
  { name: "Web Dev Workshop", category: "Workshop", fee: 300, seats: 60, date: "2026-09-12" },
  { name: "Robotics Challenge", category: "Technical", fee: 700, seats: 25, date: "2026-09-13" },
  { name: "Cultural Night", category: "Cultural", fee: 0, seats: 200, date: "2026-09-13" },
  { name: "Football Tournament", category: "Sports", fee: 150, seats: 80, date: "2026-09-14" }
];

await mongoose.connect(process.env.MONGO_URI);
await Event.deleteMany({});
await Event.insertMany(events);
console.log("Sample events inserted");
await mongoose.disconnect();
