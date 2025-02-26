import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

 const myEventsList =[{
    title:'test',
    notes:'test',
    start: new Date(),
    end: new addHours(new Date(), 2)
 }]

const CalendarComponent = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100vh' }}
    />
  </div>
)

export default CalendarComponent