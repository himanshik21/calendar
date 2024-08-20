import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddEvent from "./components/AddEvent";
import Calendar from "./components/Calendar";
import EventDetails from "./components/EventDetails";
import { ErrorProvider } from "./ErrorContext";

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
    <ErrorProvider>
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
    </ErrorProvider>
  );
}

export default App;
