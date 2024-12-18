import useFormattedDate from "./useFormattedDate";
import { filter, isEmpty } from "lodash";
import { useMemo } from "react";
import { useStore } from "../store";

const useIsWeekDataEmpy = (date: Date) => {
  const {schedule} = useStore(state => state)
  const formattedDate = useFormattedDate(date)
  const dataValidator = useMemo(() => filter(schedule, (item) => item.date === String(formattedDate)),[schedule, formattedDate])
  return isEmpty(dataValidator)
};

export default useIsWeekDataEmpy;