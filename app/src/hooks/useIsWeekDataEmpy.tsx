import useWeekStatistics from "./useWeekStatistics";
import useFormattedDate from "./useFormattedDate";
import { filter, isEmpty } from "lodash";
import { useMemo } from "react";

const useIsWeekDataEmpy = (date: Date) => {
  const data = useWeekStatistics();
  const formattedDate = useFormattedDate(date)
  const dataValidator = useMemo(() => filter(data, (item) => item.date === String(formattedDate)),[data, formattedDate])
  return isEmpty(dataValidator)
};

export default useIsWeekDataEmpy;