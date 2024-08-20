import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AddEvent = ({ addEvent }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Work");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      title,
      date,
      category,
    };
    addEvent(newEvent);
    setTitle("");
    setDate("");
    setCategory("Work");
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;
