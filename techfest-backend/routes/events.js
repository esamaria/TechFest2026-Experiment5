import express from "express";
import Event from "../models/Event.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const { name, category, fee, seats, date } = req.body;

    if (!name || !category || fee === undefined || seats === undefined || !date) {
      return res.status(400).json({
        success: false,
        message: "name, category, fee, seats and date are required"
      });
    }

    const event = await Event.create({ name, category, fee, seats, date });
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const allowedFields = ["name", "category", "fee", "seats", "date"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "No valid event fields supplied" });
    }
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
