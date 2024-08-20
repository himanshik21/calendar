import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import AddEvent from "./components/AddEvent";
import EventDetails from "./components/EventDetails";
import "./App.css";

function App() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const editEvent = (id, updatedEvent) => {
    setEvents(events.map((event) => (event.id === id ? updatedEvent : event)));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <BrowserRouter>
      <h1>Calendar Application</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddEvent addEvent={addEvent} />
              <Calendar events={events} />
            </>
          }
        />
        <Route
          path="/event/:id"
          element={
            <EventDetails
              events={events}
              editEvent={editEvent}
              deleteEvent={deleteEvent}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
