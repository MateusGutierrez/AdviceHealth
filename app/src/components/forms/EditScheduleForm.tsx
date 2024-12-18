import { EditScheduleFormValue, EditScheduleSchema } from "../../schemas/EditScheduleSchema";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { filter, head, isEmpty, map } from 'lodash';
import { useStore } from '../../store';
import { toast } from "react-toastify";
import StyledForm from "./StyledEditScheduleForm";
import useFormattedDate from "../../hooks/useFormattedDate";

interface Props{
    id: string
    time: string;
    patient: string;
    doctor: string;
    status: string;
    hide: () => void;
}

const EditScheduleForm = ({ id, doctor, time, patient, status, hide }: Props) => {
    const { doctorsSchedule, date, editSchedule, submitSchedule } = useStore(state => state);
    const formatedDate = useFormattedDate(new Date(date))

    const { handleSubmit, register, formState: { errors } } = useForm<EditScheduleFormValue>({
        resolver: zodResolver(EditScheduleSchema),
        defaultValues: {
            date: formatedDate,
            time,
            patient,
            doctor,
            status,
        },
    });

    const availableTimes = useMemo(() => doctor && date
        ? head(filter(doctorsSchedule, (d) => d.doctorName === doctor))?.weeklyAvailableSlots[formatedDate] || []
        : [], [doctor, date, doctorsSchedule, formatedDate]);

    const validDefaultTime = useMemo(() => {
            return availableTimes.includes(time) ? time : '';
    }, [time, availableTimes]);
        
    
    const onSubmit = useCallback((data: EditScheduleFormValue) => {
        editSchedule(id, {doctorName:data.doctor, patientName: data.patient, status: data.status, time: data.time})
        submitSchedule(data.time, data.doctor as string)
        toast.success('Success !', { autoClose: 2500 });
        hide()
    }, [editSchedule, hide, id, submitSchedule])

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <div className="w-100">
                <Input type="text" fullWidth placeholder="Patient" {...register('patient')} />
                {errors.patient && <Typography className="text-danger">{errors.patient.message}</Typography>}
            </div>
            <div id="forms-control-container">
                <FormControl fullWidth>
                    <InputLabel>Doctor</InputLabel>
                    <Select {...register('doctor')} defaultValue={doctor}>
                        {map(doctorsSchedule, (doctor, index) => (
                            <MenuItem key={index} value={doctor.doctorName}>
                                {doctor.doctorName} - {doctor.specialty} - R${doctor.price}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div id="day-container">
                    {isEmpty(availableTimes) ? (
                        <Typography className="text-danger">There is no more time available</Typography>
                    ) : (
                        <FormControl fullWidth>
                            <InputLabel>Time</InputLabel>
                            <Select {...register('time')} defaultValue={validDefaultTime}>
                                {availableTimes.map((time, index) => (
                                    <MenuItem key={index} value={time}>{time}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    )}
                </div>
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select {...register('status')} defaultValue={status}>
                        <MenuItem value="scheduled">Scheduled</MenuItem>
                        <MenuItem value="served">Served</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Button className='bg-primary text-light' type="submit" disabled={isEmpty(availableTimes)}>Update</Button>
        </StyledForm>
    );
};

export default EditScheduleForm