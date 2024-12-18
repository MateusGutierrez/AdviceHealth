import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useStore } from '../../store';

const DatePicker = () => {
  const { date, setDate } = useStore((state) => state);
  return (
    <DateCalendar
      value={date ? dayjs(date) : null}
      onChange={(newValue) => setDate(newValue?.toDate())}
    />
  );
};
export default DatePicker;
