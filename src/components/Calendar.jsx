/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Calendar = ({ events = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const navigate = useNavigate();

  const handleMonthChange = (direction) => {
    setSelectedMonth((prev) => (prev + direction + 12) % 12);
  };

  const filteredEvents = events.filter((event) => {
    const eventMonth = new Date(event.date).getMonth();
    return (
      (selectedCategory === "All" || event.category === selectedCategory) &&
      eventMonth === selectedMonth
    );
  });

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(
      new Date().getFullYear(),
      selectedMonth + 1,
      0
    ).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="day">
          <span>{i}</span>
          <ul>
            {filteredEvents
              .filter((event) => new Date(event.date).getDate() === i)
              .map((event) => (
                <li key={event.id} onClick={() => handleEventClick(event.id)}>
                  {event.title}
                </li>
              ))}
          </ul>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-controls">
        <button className="nav-btn" onClick={() => handleMonthChange(-1)}>
          Previous
        </button>
        <span>
          {new Date(new Date().getFullYear(), selectedMonth).toLocaleString(
            "default",
            { month: "long" }
          )}{" "}
          {new Date(new Date().getFullYear(), selectedMonth).getFullYear()}
        </span>
        <button className="nav-btn" onClick={() => handleMonthChange(1)}>
          Next
        </button>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div className="calendar-grid">{generateCalendar()}</div>
    </div>
  );
};

export default Calendar;
