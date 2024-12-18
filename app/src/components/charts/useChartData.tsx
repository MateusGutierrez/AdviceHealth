import { AllSeriesType } from '@mui/x-charts';
import useWeekStatistics from '../../hooks/useWeekStatistics';
import useDoctorsSchedule from '../../hooks/useDoctorsSchedule';

export const useChartData = () => {
  const weekStatistics = useWeekStatistics();
  const doctorsSchedule = useDoctorsSchedule();
  const weekSeries = [
    {
      type: 'bar',
      yAxisId: 'appointments',
      label: 'Appointments Scheduled',
      color: 'lightblue',
      data: weekStatistics.map((day) => day.appointmentsToday),
      highlightScope: { highlight: 'item' },
    },
    {
      type: 'line',
      yAxisId: 'revenue',
      color: 'green',
      label: 'R$ Revenue',
      data: weekStatistics.map((day) => day.dailyRevenue),
    },
    {
      type: 'line',
      yAxisId: 'appointments',
      color: 'orange',
      label: 'Served Patients',
      data: weekStatistics.map((day) => day.patientsServedToday),
    },
  ] as AllSeriesType[];
  const doctorSpecialtiesCount = doctorsSchedule.reduce(
    (acc: Record<string, number>, doctor) => {
      acc[doctor.specialty] = (acc[doctor.specialty] || 0) + 1;
      return acc;
    },
    {}
  );

  const doctorSeries = Object.entries(doctorSpecialtiesCount).map(
    ([specialty, count]) => ({
      label: specialty,
      value: count,
    })
  );

  return {
    weekStatistics,
    weekSeries,
    doctorsSchedule,
    doctorSeries,
  };
};
