import { filter, head } from "lodash";
import { useMemo } from "react";
import useFormattedDate from "./useFormattedDate";
import { useStore } from "../store";

const useDailySchedule = (date: Date) => {
  const {schedule} = useStore(state => state)
  const formattedDate = useFormattedDate(date)
  const statistic = useMemo(() =>  head(filter(schedule, (item) => item.date === String(formattedDate))), [schedule, formattedDate]);
  return statistic;
};

export default useDailySchedule;
