import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: relative;
    height: 100%;
    #header{
        display: flex;
        justify-content: space-between;
    }
    #forms-control-container{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    #name-container, #date-address{
        display: flex;
        gap:15px
    }
    
`
export default StyledForm