import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  #forms-control-container,
  #day-container,
  #name-container,
  #date-address {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;
export default StyledForm;
