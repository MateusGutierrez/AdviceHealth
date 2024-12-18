import { PieChart } from '@mui/x-charts/PieChart';
import { useChartData } from '../useChartData';
import StyledDoctorChartContainer from './styled';

const DoctorChart = () => {
  const { doctorSeries } = useChartData();
  return (
    <StyledDoctorChartContainer>
      <PieChart
        series={[
          {
            data: doctorSeries,
          },
        ]}
      />
    </StyledDoctorChartContainer>
  );
};
export default DoctorChart;
