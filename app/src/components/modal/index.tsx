import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddPatientToScheduleForm from '../forms/AddPatientToScheduleForm';
import useIsVisible from '../../hooks/useIsVisible';
import { Button } from '@mui/material';
import StyledContainer from './styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  maxWidth: '600px',
  maxHeight: "95%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '15px',
  p: 4,
};

const BasicModal = () => {
  const {isVisible, hide, show} = useIsVisible()

  return (
    <StyledContainer>
      <Button onClick={show} id='button-icon'>
        <i className="bi bi-person-add text-light" id="plus"/>
      </Button>
      <Modal
        open={isVisible}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <AddPatientToScheduleForm hide={hide}/>
        </Box>
      </Modal>
    </StyledContainer>
  );
}
export default BasicModal;