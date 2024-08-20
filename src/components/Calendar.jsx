/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Calendar = ({ events }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  const handleMonthChange = (direction) => {
    setSelectedMonth((prev) => {
      let newMonth = prev + direction;

      if (newMonth < 0) {
        newMonth = 11;
        setSelectedYear((prevYear) => prevYear - 1);
      } else if (newMonth > 11) {
        newMonth = 0;
        setSelectedYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };

  const handleEventClick = (id) => {
    navigate(`/event/${id}`);
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth();
    const eventYear = eventDate.getFullYear();
    return (
      (selectedCategory === "All" || event.category === selectedCategory) &&
      eventMonth === selectedMonth &&
      eventYear === selectedYear
    );
  });

  const generateCalendar = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="day">
          <span>{i}</span>
          <ul>
            {filteredEvents
              .filter((event) => new Date(event.date).getDate() === i)
              .map((event) => (
                <li
                  key={event.id}
                  className="event-item"
                  onClick={() => handleEventClick(event.id)}
                >
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
        <div className="monthShow">
          <button onClick={() => handleMonthChange(-1)} className="nav-btn">
            Previous
          </button>
          <span className="month-year">
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {selectedYear}
          </span>
          <button onClick={() => handleMonthChange(1)} className="nav-btn">
            Next
          </button>
        </div>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="category-select"
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
