import Table from 'react-bootstrap/Table';
import StyledTableContainer from './styled';
import { dailySchedule } from '../../store/interface';
import { map } from 'lodash';
import { useStore } from '../../store';
import { useCallback } from 'react';

interface Props{
    schedule: dailySchedule[] | undefined;
    editable:boolean;
}

const ScheduledTable = ({schedule, editable}: Props) => {
    const {removeFromSchedule} = useStore(state=> state)
    const destroy = useCallback((id: string) => {
        removeFromSchedule(id)
    }, [removeFromSchedule])
  return (
    <StyledTableContainer editable={editable}>
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
                    {map(schedule, (item) => (
                        <tr key={item.id}>
                            <td>{item.time}</td>
                            <td>{item.patientName}</td>
                            <td>{item.doctorName}</td>
                            <td id='td-container'>
                                {item.status}
                                {editable ? (
                                    <div id='icon-container'>
                                        <i className='bi bi-pencil-fill text-info' />
                                        <i className='bi bi-trash-fill text-danger' onClick={() => destroy(item.id as string)}/>
                                    </div>
                                ): null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </StyledTableContainer>
  );
}

export default ScheduledTable;