import styled from "styled-components";

const StyledSchedulingContainer = styled.div`
    display: flex;
    gap: 15px;
    height: 100%;
    #left-container{
        width: 40%;
        height: 100%;
        overflow: auto;
        #overflow-area{
            height: 100%;
            overflow: auto;
        }
        #overflow-area::-webkit-scrollbar{
            width: 8px;
            height: 8px;
        }
        #overflow-area::-webkit-scrollbar-thumb{
            background: #007bff;
            border-radius: 4px;
        }
        #overflow-area::-webkit-scrollbar-thumb:hover{
            background: #0056b3;
            border-radius: 4px;
        }
    }
    #main{
        width: 60%;
        border-radius: 15px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    #doctors-container{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    #doctor-card{
        padding:15px;
        border-radius:15px;
        display: flex;
        gap: 15px;
    }
    #icon{
        font-size:32px;
    }
    #basic-modal-container{
        border-radius: 15px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        #typotext{
            font-weight: bolder;
        }
    }
`
export default StyledSchedulingContainer