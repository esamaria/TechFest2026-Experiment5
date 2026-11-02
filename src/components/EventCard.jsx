import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function EventCard({ event }) {
  const navigate = useNavigate();
  const [seatsLeft, setSeatsLeft] = useState(event.seats);
  const [message, setMessage] = useState("");

  async function handleRegister() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    try {
      const response = await API.post("/registrations", { eventId: event._id });
      setSeatsLeft(response.data.data.event.seats);
      setMessage("Registered successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>Category: {event.category}</p>
      <p>Fee: {event.fee === 0 ? "Free" : `Rs. ${event.fee}`}</p>
      <p>Seats left: {seatsLeft}</p>

      {seatsLeft === 0 ? (
        <button disabled>SOLD OUT</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default EventCard;
