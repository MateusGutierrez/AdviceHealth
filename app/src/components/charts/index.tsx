import StyledChartContainer from './styled';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import WeekChart from './weekStatistic';
import DoctorChart from './doctors';

const Chart = () => {
  const [option, setOption] = useState('week');
  const handleChange = useCallback((e: SelectChangeEvent) => {
    setOption(e.target.value as string);
  }, []);
  return (
    <StyledChartContainer>
      <Select id="select-chart" value={option} onChange={handleChange}>
        <MenuItem value="week" style={{ fontSize: '12px' }}>
          Week information
        </MenuItem>
        <MenuItem value="doctor" style={{ fontSize: '12px' }}>
          Doctors information
        </MenuItem>
      </Select>
      {option === 'week' && <WeekChart />}
      {option === 'doctor' && <DoctorChart />}
    </StyledChartContainer>
  );
};
export default Chart;
