import { isEmpty, map } from "lodash"
import useRemindersByDate from "../../hooks/useRemindersByDate"
import { useStore } from "../../store"
import DatePicker from "../datePicker"
import { StyledDashboardContainer } from "./styled"
import { Card, CardContent, Typography } from "@mui/material"
import useDailySchedule from "../../hooks/useDailySchedule"
import ScheduledTable from "../table"
import Chart from "../charts"
import useIsWeekDataEmpy from "../../hooks/useIsWeekDataEmpy"
import useDailyStatistic from "../../hooks/useDailyStatistic"

export const DashboardContainer = () => {
    const {date} = useStore(state => state)
    const reminders = useRemindersByDate(new Date(date))
    const scheduleData = useDailySchedule(new Date(date))
    const isWeekDataEmpty = useIsWeekDataEmpy(new Date(date))
    const statistic = useDailyStatistic(new Date(date))

    return (
        <StyledDashboardContainer>
            <section id="main">
                <h5>Dashboard</h5>
                {isWeekDataEmpty ? (
                    <div className="d-flex">
                        <Typography>There are no appointments scheduled for this day.</Typography>
                        <i className="bi bi-calendar-heart-fill mx-lg-1"/>
                    </div>
                ):(
                    <>
                        <div id="content">
                                <Card id="reminder">
                                    <h6>Reminders</h6>
                                    {isEmpty(reminders) ? (
                                        <>
                                            <Typography>There are no reminders for this day. </Typography>
                                        </>
                                    ) : map(reminders, ((reminder, index) => {
                                        return (
                                            <Typography key={index}>{reminder}</Typography>
                                        )
                                    }))
                                    }
                                </Card>
                                <div id="statistics">
                                    <Card>
                                        <CardContent className="d-flex justify-content-between">
                                            <Typography>Daily revenue:</Typography>
                                            <Typography> R$ {statistic?.dailyRevenue ?? "Waiting Payment"}</Typography>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="d-flex justify-content-between">
                                            <Typography>Patients served today:</Typography>
                                            <Typography>{statistic?.patientsServedToday ?? scheduleData?.dailySchedule.length} <i className="bi bi-people-fill" /></Typography>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="d-flex justify-content-between">
                                            <Typography>Appointments today:</Typography>
                                            <Typography>{statistic?.appointmentsToday ?? scheduleData?.dailySchedule.length}<i className="bi bi-calendar-fill" id="calendar-icon" /></Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                        </div>
                        <ScheduledTable schedule={scheduleData?.dailySchedule} editable={false}/>
                    </>
                )}
            </section>
            <section>
                <div id="calendar-container">
                    <DatePicker/>
                </div>
                <Card id="chart-container">
                    <Chart/>
                </Card>
            </section>
        </StyledDashboardContainer>
    )
}