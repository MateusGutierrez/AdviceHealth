import { map } from "lodash"
import useRemindersByDate from "../../hooks/useRemindersByDate"
import { useStore } from "../../store"
import DatePicker from "../datePicker"
import { StyledDashboardContainer } from "./styled"
import { Card, CardContent, Typography } from "@mui/material"
import useDailyStatistic from "../../hooks/useDailyStatistic"
import ScheduledTable from "../table"
import Chart from "../charts"

export const DashboardContainer = () => {
    const {date} = useStore(state => state)
    const reminders = useRemindersByDate(new Date(date))
    const statistic = useDailyStatistic(new Date(date))

    return (
        <StyledDashboardContainer>
            <section id="main">
                <h5>Dashboard</h5>
                <div id="content">
                    <Card id="reminder">
                        <h6>Reminders</h6>
                        {map(reminders, ((reminder, index) => {
                            return (
                                <Typography key={index}>{reminder}</Typography>
                            )
                        }))}
                    </Card>
                    <div id="statistics">
                        <Card>
                            <CardContent className="d-flex justify-content-between">
                                <Typography>Daily revenue:</Typography>
                                <Typography>R$ {statistic?.dailyRevenue}</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="d-flex justify-content-between">
                                <Typography>Patients served today:</Typography>
                                <Typography>{statistic?.patientsServedToday} <i className="bi bi-people-fill"/></Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="d-flex justify-content-between">
                                <Typography>Appointments today:</Typography>
                                <Typography>{statistic?.appointmentsToday}<i className="bi bi-calendar-fill" id="calendar-icon"/></Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <ScheduledTable schedule={statistic?.dailySchedule} />
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