import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    fee: { type: Number, required: true, min: 0 },
    seats: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
