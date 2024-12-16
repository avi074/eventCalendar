import { PlusSquare } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip"
import { format } from "date-fns"
import { Input } from "./ui/input"
import { Event, EventsByDate } from "@/types/Events"
import { useEffect, useState } from "react"

interface EventViewProps {
  selectedDate: Date | null
  events: EventsByDate
}

const EventView: React.FC<EventViewProps> = ({ selectedDate, events }) => {
  const [filteredEvents, setfilteredEvents] = useState<Event[]>([])

  useEffect(() => {
    if (selectedDate && events) {
      setfilteredEvents(events[format(selectedDate, "dd MMM yyyy")])
    }
  }, [selectedDate, events])
  return (
    <>
      <Card className='h-[500px] overflow-y-auto'>
        <CardHeader className='gap-2'>
          <div className="flex items-center justify-between">
            <h2 className='font-semibold w-40'>
              {selectedDate
                ? format(selectedDate, "dd MMM yyyy")
                : "Select a Day"}
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PlusSquare className='cursor-pointer size-8 rounded-md hover:text-background hover:bg-foreground hover:scale-95' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add event</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input type='search' placeholder='Search...' />
        </CardHeader>
        <CardContent className='border-t-2'>
          {filteredEvents?.map((event) => (
            <h2 key={event.id}>{event.title}</h2>
          ))}
        </CardContent>
      </Card>
    </>
  )
}

export default EventView
