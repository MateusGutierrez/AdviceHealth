import { filter, head } from "lodash";
import { useMemo } from "react";
import useFormattedDate from "./useFormattedDate";
import useWeekStatistics from "./useWeekStatistics";

const useDailyStatistic = (date: Date) => {
  const data = useWeekStatistics()
  const formattedDate = useFormattedDate(date)
  const statistic = useMemo(() =>  head(filter(data, (item) => item.date === String(formattedDate))), [data, formattedDate]);
  return statistic;
};

export default useDailyStatistic;