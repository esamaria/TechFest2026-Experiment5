import EventCard from "./EventCard";

function EventList({ events }) {
  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;