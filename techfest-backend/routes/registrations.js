import express from "express";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res, next) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "eventId is required"
      });
    }

    const existing = await Registration.findOne({
      user: req.user.id,
      event: eventId
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You are already registered for this event"
      });
    }

    const event = await Event.findOneAndUpdate(
      { _id: eventId, seats: { $gt: 0 } },
      { $inc: { seats: -1 } },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event not found or no seats available"
      });
    }

    const registration = await Registration.create({
      user: req.user.id,
      event: eventId
    });

    const populated = await registration.populate("event");

    res.status(201).json({
      success: true,
      message: "Event registration successful",
      data: populated
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You are already registered for this event"
      });
    }
    next(error);
  }
});

router.get("/my", protect, async (req, res, next) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: registrations });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    const registrations = await Registration.find()
      .populate("user", "name email")
      .populate("event", "name category date");

    res.json({ success: true, data: registrations });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found"
      });
    }

    if (
      registration.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot cancel this registration"
      });
    }

    await Registration.findByIdAndDelete(req.params.id);
    await Event.findByIdAndUpdate(registration.event, { $inc: { seats: 1 } });

    res.json({
      success: true,
      message: "Registration cancelled successfully"
    });
  } catch (error) {
    next(error);
  }
});

export default router;
