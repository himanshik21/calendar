/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = ({ events, editEvent, deleteEvent }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = events.find((event) => event.id === parseInt(id));

  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || "");

  const handleEdit = () => {
    const updatedEvent = { ...event, title, date };
    editEvent(event.id, updatedEvent);
    navigate("/");
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate("/");
  };

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="event-details">
      <h2>Edit Event</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="edit-input"
        placeholder="Event Title"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="edit-input"
      />
      <div className="buttons">
        <button onClick={handleEdit} className="save-btn">
          Save Changes
        </button>
        <button onClick={handleDelete} className="delete-btn">
          Delete Event
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
