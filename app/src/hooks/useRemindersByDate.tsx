import { filter, head } from "lodash";
import useWeekStatistics from "./useWeekStatistics";
import { useMemo } from "react";
import useFormattedDate from "./useFormattedDate";

const useRemindersByDate = (date: Date) => {
  const data = useWeekStatistics();
  const formattedDate = useFormattedDate(date)
  const reminders = useMemo(() =>  head(filter(data, (item) => item.date === String(formattedDate)))?.reminders, [data, formattedDate]);
  return reminders;
};



export default useRemindersByDate;
