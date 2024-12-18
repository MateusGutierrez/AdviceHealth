import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useIsVisible from '../../hooks/useIsVisible';
import { Button } from '@mui/material';
import styled from 'styled-components';

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
    destroy: () => void;
}

const WarningModal = ({destroy}: Props) => {
  const {isVisible, hide, show} = useIsVisible()

  return (
    <StyledContainer>
        <i className='bi bi-trash-fill text-danger' onClick={show} id="trash"/>
      <Modal
        open={isVisible}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h5 className='text-center'>Are you sure ?</h5>
        <div className='d-flex gap-3'>
            <Button onClick={hide} className='bg-primary text-light'>No</Button>
            <Button onClick={destroy} className='bg-danger text-light'>Yes</Button>
        </div>
        </Box>
      </Modal>
    </StyledContainer>
  );
}
export default WarningModal;