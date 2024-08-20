import { useState } from "react";
import { useError } from "../ErrorContext";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Work");
  const { error, setError } = useError();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) {
      setError("Title and date are required");
      return;
    }
    setError(""); // Clear previous errors
    // Add event logic here
    setTitle("");
    setDate("");
    setCategory("Work");
  };

  return (
    <div className="add-event-form">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
