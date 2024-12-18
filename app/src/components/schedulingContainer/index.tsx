import { map } from 'lodash';
import { useStore } from '../../store';
import DatePicker from '../datePicker';

import { Card, Typography } from '@mui/material';
import StyledSchedulingContainer from './styled';
import useDoctorsSchedule from '../../hooks/useDoctorsSchedule';
import useDailyStatistic from '../../hooks/useDailySchedule';
import ScheduledTable from '../table';
import useIsWeekDataEmpy from '../../hooks/useIsWeekDataEmpy';
import BasicModal from '../modal';
import DayOffModal from '../modal/DayOffModal';

export const SchedulingContainer = () => {
  const { date } = useStore((state) => state);
  const doctors = useDoctorsSchedule();
  const statistic = useDailyStatistic(new Date(date));
  const isWeekDataEmpty = useIsWeekDataEmpy(new Date(date));

  return (
    <StyledSchedulingContainer>
      <section id="left-container">
        <div id="overflow-area">
          <h5>Scheduling</h5>
          <div id="doctors-container">
            {map(doctors, (doctor, index) => (
              <Card key={index} id="doctor-card">
                <i className="bi bi-person-circle text-secondary" id="icon" />
                <div>
                  <Typography>{doctor.doctorName}</Typography>
                  <Typography>{doctor.specialty}</Typography>
                </div>
              </Card>
            ))}
          </div>
          <Card id="calendar-container">
            <DatePicker />
          </Card>
        </div>
      </section>
      <section id="main">
        {isWeekDataEmpty ? (
          <div className="d-flex">
            <Typography>
              There are no appointments scheduled for this day.
            </Typography>
            <i className="bi bi-calendar-heart-fill mx-lg-1" />
          </div>
        ) : (
          <div id="right-container">
            <div id="overflow-area">
              <div
                className="bg-primary text-light mb-3"
                id="basic-modal-container"
              >
                <Typography id="typotext">Schedule a new patient:</Typography>
                <BasicModal />
              </div>
              <div
                className="bg-secondary text-light mb-3"
                id="basic-modal-container"
              >
                <Typography id="typotext">Determine an absent day:</Typography>
                <DayOffModal />
              </div>
              <ScheduledTable
                editable={true}
                schedule={statistic?.dailySchedule}
              />
            </div>
          </div>
        )}
      </section>
    </StyledSchedulingContainer>
  );
};
