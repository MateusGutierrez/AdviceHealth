import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useIsVisible from '../../hooks/useIsVisible';
import styled from 'styled-components';
import EditScheduleForm from '../forms/EditScheduleForm';

const StyledContainer = styled.div``;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '600px',
  maxHeight: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '15px',
  p: 4,
};

interface Props {
  id: string;
  time: string;
  patient: string;
  doctor: string;
  status: string;
}

const EditModal = ({ id, time, patient, doctor, status }: Props) => {
  const { isVisible, hide, show } = useIsVisible();

  return (
    <StyledContainer>
      <i className="bi bi-pencil-fill text-info" id="pencil" onClick={show} />
      <Modal
        open={isVisible}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditScheduleForm
            id={id}
            time={time}
            patient={patient}
            doctor={doctor}
            status={status}
            hide={hide}
          />
        </Box>
      </Modal>
    </StyledContainer>
  );
};
export default EditModal;
