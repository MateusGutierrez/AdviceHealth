import { filter, head } from 'lodash';
import { useMemo } from 'react';
import useFormattedDate from './useFormattedDate';
import { useStore } from '../store';

const useRemindersByDate = (date: Date) => {
  const { weekStatistics } = useStore((state) => state);
  const formattedDate = useFormattedDate(date);
  const reminders = useMemo(
    () =>
      head(
        filter(weekStatistics, (item) => item.date === String(formattedDate))
      )?.reminders,
    [weekStatistics, formattedDate]
  );
  return reminders;
};

export default useRemindersByDate;
