import { useEffect, useState } from "react";
import API from "../api";

function MyRegistrations() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    API.get("/registrations/my")
      .then((response) => {
        if (active) setItems(response.data.data);
      })
      .catch((err) => {
        if (active) setMessage(err.response?.data?.message || "Please login first");
      });

    return () => {
      active = false;
    };
  }, []);

  async function cancel(id) {
    try {
      await API.delete(`/registrations/${id}`);
      setMessage("Registration cancelled");
      const response = await API.get("/registrations/my");
      setItems(response.data.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Cancellation failed");
    }
  }

  return (
    <div className="page">
      <h1>My Registrations</h1>
      {message && <p>{message}</p>}
      {items.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        items.map((item) => (
          <div className="event-card" key={item._id}>
            <h3>{item.event?.name}</h3>
            <p>Category: {item.event?.category}</p>
            <p>Date: {item.event?.date?.slice(0, 10)}</p>
            <button onClick={() => cancel(item._id)}>Cancel</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRegistrations;
