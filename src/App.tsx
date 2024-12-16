import { useEffect, useState } from "react"
import CalendarView from "./components/CalendarView"
import EventView from "./components/EventView"
import { EventsByDate } from "./types/Events"

function App() {
  const getEventsFromLocal = () => {
    const events = localStorage.getItem("calendarEvents")
    return events ? JSON.parse(events) : {}
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<EventsByDate>(getEventsFromLocal)

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events))
  }, [events])

  // handles the selected Date
  const handleSelectedDate = (day: Date) => setSelectedDate(day)

  return (
    <>
      <div className='w-[1000px] h-[500px] flex items-center justify-center'>
        <div id='calendar-view' className='w-1/2'>
          <CalendarView
            selectedDate={selectedDate}
            handleSelected={handleSelectedDate}
          />
        </div>
        <div
          id='side-panel'
          className={`w-1/2 ${
            selectedDate
            ? "pointer-events-auto"
              : "pointer-events-none"
          }`}>
          <EventView selectedDate={selectedDate} events={events} />
        </div>
      </div>
    </>
  )
}

export default App
