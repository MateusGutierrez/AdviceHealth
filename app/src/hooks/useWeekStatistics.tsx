import { useStore } from "../store";

const useWeekStatistics = () => {
  const {weekStatistics} = useStore(state => state)
  return weekStatistics;
};

export default useWeekStatistics;
