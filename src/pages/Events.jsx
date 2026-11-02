import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import API from "../api";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/events")
      .then((response) => setEvents(response.data.data))
      .catch((err) => setError(err.response?.data?.message || "Could not load events"))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter((event) => {
    const nameMatches = event.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatches = category === "All" || event.category === category;
    return nameMatches && categoryMatches;
  });

  if (loading) return <div className="page"><h1>Events</h1><p>Loading...</p></div>;
  if (error) return <div className="page"><h1>Events</h1><p className="error-msg">{error}</p></div>;

  return (
    <div className="page">
      <h1>Events</h1>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Technical">Technical</option>
        <option value="Workshop">Workshop</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
      </select>

      <EventList events={filteredEvents} />
    </div>
  );
}

export default Events;
