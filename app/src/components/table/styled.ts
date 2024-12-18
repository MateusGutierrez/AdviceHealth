import styled from 'styled-components';

const StyledTableContainer = styled.div<{ editable: boolean }>`
  max-height: ${({ editable }) => (editable ? 'unset' : '50%')};

  #overflow-area {
    height: 100%;
    overflow: auto;
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
  #td-container {
    display: flex;
    justify-content: space-between;
  }
  #icon-container {
    display: flex;
    gap: 15px;
    #pencil,
    #trash {
      cursor: pointer;
    }
  }
`;

export default StyledTableContainer;
