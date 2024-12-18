import { DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from '../../store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useIsVisible from '../../hooks/useIsVisible';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import StyledContainer from './styled';
import { useCallback, useMemo, useState } from 'react';
import { filter, head, map } from 'lodash';
import { toast } from 'react-toastify';
import useFormattedDate from '../../hooks/useFormattedDate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  maxWidth: '600px',
  maxHeight: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '15px',
  p: 4,
};

const DayOffModal = () => {
  const { isVisible, hide, show } = useIsVisible();
  const { dayOff, setDayOff, doctorsSchedule, destroyOneDayOffSchedule } =
    useStore((state) => state);
  const [doctor, setDoctor] = useState('');
  const formatedDay = useFormattedDate(new Date(dayOff as string));

  const click = useCallback(() => {
    destroyOneDayOffSchedule(doctor, formatedDay);
    hide();
    toast.success('Success', { autoClose: 2500 });
  }, [destroyOneDayOffSchedule, doctor, formatedDay, hide]);

  const handleDoctorChange = useCallback((e: SelectChangeEvent) => {
    setDoctor(e.target.value);
  }, []);

  const availableDays = useMemo(() => {
    return doctor
      ? Object.keys(
          head(filter(doctorsSchedule, (d) => d.doctorName === doctor))
            ?.weeklyAvailableSlots || {}
        )
      : [];
  }, [doctor, doctorsSchedule]);

  const shouldDisableDate = useCallback(
    (date: Dayjs | null) => {
      if (!date) return true;
      const dayString = date.format('YYYY-MM-DD');
      return !availableDays.includes(dayString);
    },
    [availableDays]
  );

  return (
    <StyledContainer>
      <Button onClick={show} id="button-icon">
        <i className="bi bi-person-dash text-light" id="plus" />
      </Button>
      <Modal
        open={isVisible}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5>Determine an absent day:</h5>
          <FormControl fullWidth>
            <InputLabel>Doctor</InputLabel>
            <Select value={doctor} onChange={handleDoctorChange}>
              {map(doctorsSchedule, (doctor, index) => (
                <MenuItem key={index} value={doctor.doctorName}>
                  {doctor.doctorName} - {doctor.specialty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DateCalendar
            value={dayOff ? dayjs(dayOff) : null}
            onChange={(newValue) => setDayOff(newValue?.toDate())}
            shouldDisableDate={shouldDisableDate}
          />
          <div className="d-flex justify-content-center">
            <Button
              onClick={click}
              className="bg-primary text-light"
              disabled={!dayOff}
            >
              Done
            </Button>
          </div>
        </Box>
      </Modal>
    </StyledContainer>
  );
};

export default DayOffModal;
