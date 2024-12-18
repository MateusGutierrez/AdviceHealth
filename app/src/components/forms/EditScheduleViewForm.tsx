import { useForm } from 'react-hook-form';
import {
  AddPatientToScheduleFormValue,
  AddPatientToScheduleSchema,
} from '../../schemas/AddPatientToScheduleSchema';
import { useStore } from '../../store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import StyledForm from './StyledScheduleViewForm';

interface Props {
  hide: () => void;
  patientData: AddPatientToScheduleFormValue;
}

const ScheduleViewForm = ({ hide, patientData }: Props) => {
  const { updatePatientData } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPatientToScheduleFormValue>({
    defaultValues: patientData,
    resolver: zodResolver(AddPatientToScheduleSchema),
  });

  const onSubmit = (data: AddPatientToScheduleFormValue) => {
    updatePatientData({
      id: patientData.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      cpf: data.cpf,
      birthdate: data.birthdate,
      day: patientData.day,
      time: patientData.time,
      doctor: patientData.doctor,
      status: patientData.status,
    });
    toast.success('Update Success', { autoClose: 2500 });
    hide();
  };
  return (
    <div>
      <h5>Update Information</h5>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div id="name-container">
          <div className="w-100">
            <Input
              type="text"
              fullWidth
              placeholder="First name"
              {...register('firstName')}
            />
            {errors.firstName && (
              <Typography className="text-danger">
                {errors.firstName.message}
              </Typography>
            )}
          </div>
          <div className="w-100">
            <Input
              type="text"
              fullWidth
              placeholder="Last name"
              {...register('lastName')}
            />
            {errors.lastName && (
              <Typography className="text-danger">
                {errors.lastName.message}
              </Typography>
            )}
          </div>
        </div>
        <div id="name-container">
          <div className="w-100">
            <Input
              type="email"
              fullWidth
              placeholder="E-mail"
              {...register('email')}
            />
            {errors.email && (
              <Typography className="text-danger">
                {errors.email.message}
              </Typography>
            )}
          </div>
          <div className="w-100">
            <Input
              type="number"
              fullWidth
              placeholder="CPF"
              {...register('cpf')}
            />
            {errors.cpf && (
              <Typography className="text-danger">
                {errors.cpf.message}
              </Typography>
            )}
          </div>
        </div>
        <div id="date-address">
          <div>
            <Input
              type="date"
              placeholder="Birthdate"
              fullWidth
              {...register('birthdate')}
            />
            {errors.birthdate && (
              <Typography className="text-danger">
                {errors.birthdate.message}
              </Typography>
            )}
          </div>
          <Input
            type="text"
            fullWidth
            placeholder="Address"
            {...register('address')}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button type="submit" className="bg-primary text-light">
            Update
          </Button>
        </div>
      </StyledForm>
    </div>
  );
};
export default ScheduleViewForm;
