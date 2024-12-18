import { useStore } from '../store';

const useDoctorsSchedule = () => {
  const { doctorsSchedule } = useStore((state) => state);
  return doctorsSchedule;
};

export default useDoctorsSchedule;
