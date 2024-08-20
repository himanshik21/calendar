/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useError } from "../ErrorContext";

const EventDetails = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, setError } = useError();

  const event = events.find((event) => event.id === parseInt(id));

  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || "");

  useEffect(() => {
    if (!event) {
      setError("Event not found");
      navigate("/");
    }
  }, [event, navigate, setError]);

  const handleEdit = () => {
    if (!title || !date) {
      setError("Title and date are required");
      return;
    }
    setError("");
    console.log("Updated Event:", { title, date });
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      // Code to delete the event
      console.log("Event deleted:", event);
      navigate("/");
    }
  };

  return (
    <div className="event-details">
      {error && <p className="error-message">{error}</p>}
      <h2>Edit Event</h2>
      <label>
        Event Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="edit-input"
          placeholder="Event Title"
        />
      </label>
      <label>
        Event Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="edit-input"
        />
      </label>
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
