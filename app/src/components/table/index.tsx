import Table from 'react-bootstrap/Table';
import { Schedule } from './interface';
import { map } from 'lodash';

import StyledTableContainer from './styled';

interface Props{
    schedule: Schedule[] | undefined;
}

const ScheduledTable = ({schedule}: Props) => {
  return (
    <StyledTableContainer>
        <div id="overflow-area">
            <Table striped="columns" hover bordered>
                <thead>
                    <tr>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {map(schedule, (item, index) => (
                        <tr key={index}>
                            <td>{item.time}</td>
                            <td>{item.patientName}</td>
                            <td>{item.doctorName}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </StyledTableContainer>
  );
}

export default ScheduledTable;