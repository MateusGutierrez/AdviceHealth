import styled from "styled-components";

export const StyledDashboardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    height: 100%;
    section{
        border-radius: 15px;
        width: 40%;
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 15px;
    }
    #main{
        width: 60%;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    #content{
        display: flex;
        gap: 15px;
        /* height: 50%; */
    }
    #reminder{
        width: 50%;
        height: 100%;
        max-height: 270px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 15px;
    }
    #statistics{
        width: 50%;
        height: 100%;
        max-height: 270px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap:15px;
    }
    #calendar-icon{
        margin-left: 5px;
    }
    #calendar-container{
        height: 50%;
        max-height: 290px;
    }
    #chart-container{
        padding: 15px;
    }

`