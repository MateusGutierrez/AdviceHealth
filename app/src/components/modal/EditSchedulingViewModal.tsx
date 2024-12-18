import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useIsVisible from '../../hooks/useIsVisible';
import styled from 'styled-components';
import { AddPatientToScheduleFormValue} from '../../schemas/AddPatientToScheduleSchema';
import ScheduleViewForm from '../forms/EditScheduleViewForm';

const StyledContainer = styled.div`
    
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '600px',
  maxHeight: "95%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '15px',
  p: 4,
};

interface Props{
    patientData: AddPatientToScheduleFormValue;
}

const EditModal = ({patientData}: Props) => {
  const {isVisible, hide, show} = useIsVisible()
  
  return (
    <StyledContainer>
        <i className='bi bi-pencil-fill text-info' id='pencil' onClick={show} />
      <Modal
        open={isVisible}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <ScheduleViewForm hide={hide} patientData={patientData}/>
        </Box>
      </Modal>
    </StyledContainer>
  );
}
export default EditModal;