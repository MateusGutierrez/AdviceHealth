import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  gap: 15px;
  height: 100%;
  width: 100%;
  overflow: auto;
  #overflow-area {
    height: 100%;
    overflow: auto;
    width: 100%;
  }
  #overflow-area::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  #overflow-area::-webkit-scrollbar-thumb {
    background: #007bff;
    border-radius: 4px;
  }
  #overflow-area::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
    border-radius: 4px;
  }
  #card {
    border-radius: 15px;
  }
  #card-body {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  #patient {
    display: flex;
    gap: 15px;
  }
  #icon-container {
    display: flex;
    gap: 15px;
  }
  #pencil,
  #trash {
    cursor: pointer;
  }
`;
export default StyledContainer;
