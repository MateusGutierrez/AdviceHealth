import { Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPatientToScheduleFormValue, AddPatientToScheduleSchema } from "../../schemas/AddPatientToScheduleSchema";
import { useCallback, useMemo, useState } from "react";
import { filter, head, isEmpty, map } from 'lodash';
import { useStore } from '../../store';
import StyledForm from './StyledForm';
import { v4 as uuidv4 } from 'uuid';

interface Props{
  hide: () => void;
}

const AddPatientToScheduleForm = ({hide}: Props) => {
  const [doctor, setDoctor] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const { doctorsSchedule, addPatientData, submitSchedule, addToSchedule } = useStore(state => state);

  const { handleSubmit, register, formState: { errors } } = useForm<AddPatientToScheduleFormValue>({
    resolver: zodResolver(AddPatientToScheduleSchema)
  });

  const onSubmit = useCallback((data: AddPatientToScheduleFormValue) => {
    addPatientData({...data, doctor, id: uuidv4()})
    submitSchedule(data.time, doctor)
    addToSchedule({date: data.day, dailySchedule: [{
      id: uuidv4(), 
      time: data.time, 
      patientName: `${data.firstName} ${data.lastName}`, 
      doctorName: doctor, 
      status: data.status
    }]})
    hide()
  }, [addPatientData, addToSchedule, doctor, hide, submitSchedule]);

  const handleDoctorChange = useCallback((event: SelectChangeEvent) => {
    setDoctor(event.target.value as string);
    setSelectedDay('');
    setSelectedTime('');
  }, []);

  const handleDayChange = useCallback((event: SelectChangeEvent) => {
    setSelectedDay(event.target.value);
    setSelectedTime('');
  }, []);

  const handleTimeChange = useCallback((event: SelectChangeEvent) => {
    setSelectedTime(event.target.value);
  }, []);

  const handleStatusChange = useCallback((event: SelectChangeEvent) => {
    setStatus(event.target.value);
  }, []);

  const availableDays = useMemo(() => {
    return doctor 
      ? Object.keys(
          head(filter(doctorsSchedule, (d) => d.doctorName === doctor))?.weeklyAvailableSlots || {}
        )
      : [];
  }, [doctor, doctorsSchedule]);

  const availableTimes = useMemo(() => {
    return doctor && selectedDay
      ? head(filter(doctorsSchedule, (d) => d.doctorName === doctor))?.weeklyAvailableSlots[selectedDay] || []
      : [];
  }, [doctor, selectedDay, doctorsSchedule]);
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div id='header'>
        <Typography className="text-primary">Schedule a new patient</Typography>
        <Button onClick={hide}><i className='bi bi-x' id='x' onClick={hide}/></Button>
      </div>
      <div id='name-container'>
        <div className='w-100'>
          <Input type="text" fullWidth placeholder='First name' {...register('firstName')} />
          {errors.firstName && <Typography className='text-danger'>{errors.firstName.message}</Typography>}
        </div>
        <div className='w-100'>
          <Input type="text" fullWidth placeholder='Last name' {...register('lastName')} />
          {errors.lastName && <Typography className='text-danger'>{errors.lastName.message}</Typography>}
        </div>
      </div>
      <div id='name-container'>
        <div className='w-100'>
          <Input type="email" fullWidth placeholder='E-mail' {...register('email')} />
          {errors.email && <Typography className='text-danger'>{errors.email.message}</Typography>}
        </div>
        <div className='w-100'>
          <Input type="number" fullWidth placeholder='CPF' {...register('cpf')} />
          {errors.cpf && <Typography className='text-danger'>{errors.cpf.message}</Typography>}
        </div>
      </div>
      <div id='date-address'>
        <div>
          <Input type="date" placeholder='Birthdate' {...register('birthdate')} />
          {errors.birthdate && <Typography className='text-danger'>{errors.birthdate.message}</Typography>}
        </div>

        <Input type="text" fullWidth placeholder='Address' {...register('address')} />
      </div>

      <div id='forms-control-container'>
        <FormControl fullWidth>
          <InputLabel>Doctor</InputLabel>
          <Select value={doctor} onChange={handleDoctorChange}>
            {map(doctorsSchedule, (doctor, index) => (
              <MenuItem key={index} value={doctor.doctorName}>
                {doctor.doctorName} - {doctor.specialty} - R${doctor.price}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div id='name-container'>
          <FormControl fullWidth disabled={!availableDays.length}>
            <InputLabel>Day</InputLabel>
            <Select value={selectedDay} {...register('day', {
              onChange(e) {
                handleDayChange(e)
              }
            })}>
              {availableDays.map((day, index) => (
                <MenuItem key={index} value={day}>{day}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!availableTimes.length}>
            <InputLabel>Time</InputLabel>
            <Select value={selectedTime} {...register('time', {
              onChange(e) {
                  handleTimeChange(e)
              },
            })} >
              {availableTimes.map((time, index) => (
                <MenuItem key={index} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} id='status-select' required {...register('status', {
              onChange(e) {
                handleStatusChange(e)
              }
            })}>
              <MenuItem value='scheduled'>Scheduled</MenuItem>
              <MenuItem value='served'>Served</MenuItem>
            </Select>
          </FormControl>
      </div>

      <Button type="submit" disabled={!selectedTime || !isEmpty(errors)}>Submit</Button>
    </StyledForm>
  );
};

export default AddPatientToScheduleForm;
