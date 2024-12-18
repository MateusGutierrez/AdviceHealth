import Table from 'react-bootstrap/Table';
import StyledTableContainer from './styled';
import { dailySchedule } from '../../store/interface';
import { map } from 'lodash';
import { useStore } from '../../store';
import { useCallback } from 'react';
import WarningModal from '../modal/WaringModal';
import EditModal from '../modal/EditModal';

interface Props {
  schedule: dailySchedule[] | undefined;
  editable: boolean;
}

const ScheduledTable = ({ schedule, editable }: Props) => {
  const { removeFromSchedule } = useStore((state) => state);
  const destroy = useCallback(
    (id: string) => {
      removeFromSchedule(id);
    },
    [removeFromSchedule]
  );
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
                <td id="td-container">
                  {item.status}
                  {editable ? (
                    <div id="icon-container">
                      <EditModal
                        key={item.id}
                        id={item.id as string}
                        doctor={item.doctorName}
                        time={item.time}
                        status={item.status}
                        patient={item.patientName}
                      />
                      <WarningModal
                        destroy={() => destroy(item.id as string)}
                      />
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </StyledTableContainer>
  );
};

export default ScheduledTable;
