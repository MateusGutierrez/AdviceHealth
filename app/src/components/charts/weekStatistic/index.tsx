import { BarPlot } from '@mui/x-charts/BarChart';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useChartData } from '../useChartData';

const WeekChart = () => {
  const { weekSeries, weekStatistics } = useChartData();
  return (
    <ResponsiveChartContainer
      series={weekSeries}
      margin={{ top: 10 }}
      xAxis={[
        {
          id: 'date',
          data: weekStatistics.map((day) => new Date(day.date)),
          scaleType: 'band',
          valueFormatter: (value) => value.toLocaleDateString(),
        },
      ]}
      yAxis={[
        {
          id: 'appointments',
          scaleType: 'linear',
          label: 'Appointments',
        },
        {
          id: 'revenue',
          scaleType: 'linear',
          label: 'Revenue (R$)',
          valueFormatter: (value) => `R$${value.toLocaleString()}`,
        },
      ]}
    >
      <ChartsAxisHighlight x="line" />
      <BarPlot />
      <LinePlot />
      <LineHighlightPlot />
      <ChartsXAxis
        label="Date"
        position="bottom"
        axisId="date"
        tickLabelStyle={{
          fontSize: 10,
        }}
      />
      <ChartsYAxis
        label="Appointments"
        position="left"
        axisId="appointments"
        tickLabelStyle={{ fontSize: 10 }}
        sx={{
          [`& .${axisClasses.label}`]: {
            transform: 'translateX(-5px)',
          },
        }}
      />
      <ChartsYAxis
        label="Revenue (R$)"
        position="right"
        axisId="revenue"
        tickLabelStyle={{ fontSize: 10 }}
        sx={{
          [`& .${axisClasses.label}`]: {
            transform: 'translateX(35px)',
          },
        }}
      />
      <ChartsTooltip />
    </ResponsiveChartContainer>
  );
};
export default WeekChart;
