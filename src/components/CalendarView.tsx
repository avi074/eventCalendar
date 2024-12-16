import { Fragment, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import {
  format,
  startOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
  getDay,
} from "date-fns"

interface CalendarViewProps {
  selectedDate: Date | null
  handleSelected: (day: Date) => void
}

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  handleSelected,
}) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const [currentDate, setCurrentDate] = useState(new Date())

  // Get the current month's start and end date
  const startOfCurrentMonth = startOfMonth(currentDate)
  const endOfCurrentMonth = addMonths(startOfCurrentMonth, 1)

  // Get all days of the current month
  // const daysInMonth = eachDayOfInterval({
  //   start: startOfCurrentMonth,
  //   end: endOfCurrentMonth,
  // })

  // Get the start of the week of the first day of the month and the end of the week of the last day of the month
  const firstWeekStart = startOfWeek(startOfCurrentMonth, { weekStartsOn: 1 })
  const lastWeekEnd = endOfWeek(endOfCurrentMonth, { weekStartsOn: 1 })

  // Generate all days to be displayed on the calendar, including empty days before and after the current month
  const calendarDays = eachDayOfInterval({
    start: firstWeekStart,
    end: lastWeekEnd,
  })

  // Navigate to the previous month
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  // Navigate to the next month
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  return (
    <Card className='flex flex-col flex-1'>
      <CardHeader className='flex-row items-center'>
        <Button onClick={handlePrevMonth}>Previous</Button>
        <h2 className='flex-1 text-center font-medium'>
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <Button onClick={handleNextMonth}>Next</Button>
      </CardHeader>
      <CardContent className='grid grid-cols-[repeat(5,1fr)_4px_repeat(2,1fr)] gap-3'>
        {weekDays.map((day, index) => (
          <Fragment key={`week-${day}-${index}`}>
            {index === 5 && <span className='spacer'></span>}
            <div className='text-center font-bold border-b-2'>{day}</div>
          </Fragment>
        ))}
        {calendarDays.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isTodayDate = isToday(day)
          const isSelectedDate =
            selectedDate &&
            isSameMonth(day, selectedDate) &&
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")

          // Check if the day is a weekend (Saturday or Sunday)
          const isWeekend = getDay(day) === 6 // 0 = Sunday, 6 = Saturday

          return (
            <Fragment key={`${format(day, "yyyy-MM-dd")}-${index}`}>
              {isWeekend && <span className='spacer'></span>}
              <div
                onClick={() => handleSelected(day)}
                style={{
                  backgroundColor: isTodayDate
                    ? "#D1D5DB"
                    : isSelectedDate
                    ? "#3B82F6" // Style for selected date (blue background)
                    : isCurrentMonth
                    ? "#F9FAFB" // Regular day in the current month
                    : "#E5E7EB", // Days outside the current month
                }}
                className={`text-center p-2.5 rounded-md cursor-pointer border-2 ${
                  isSelectedDate && "border-blue-500 font-semibold"
                }`}>
                <span
                  className={`${isTodayDate ? "font-bold" : "font-inherit"}`}>
                  {format(day, "d")}
                </span>
              </div>
            </Fragment>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default CalendarView
