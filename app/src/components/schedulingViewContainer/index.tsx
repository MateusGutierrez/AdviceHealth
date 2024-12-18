import { Button, CardContent, Input, Typography } from "@mui/material";
import StyledContainer from "./styled";
import { useStore } from "../../store";
import { Card, CardBody } from "react-bootstrap";
import { filter, map } from "lodash";
import WarningModal from "../modal/WaringModal";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import EditModal from "../modal/EditSchedulingViewModal";
import { AddPatientToScheduleFormValue } from "../../schemas/AddPatientToScheduleSchema";

const SchedulingViewContainer = () => {
    const {patientsData, destroyPatientData} = useStore(state => state);
    const [search, setSearch] = useState('');
    const [filteredList, setFilteredList] = useState<AddPatientToScheduleFormValue[]>(patientsData)
    
    const destroy = useCallback((id: string) => {
        destroyPatientData(id)
        toast.success('Success', { autoClose: 2500})
    },[destroyPatientData])
    
    const submit = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        const performSearch = filter(filteredList, (item) => {
            return (
              item.firstName.toLowerCase().includes(search.toLowerCase()) ||
              item.lastName.toLowerCase().includes(search.toLowerCase()) ||
              item.email.toLowerCase().includes(search.toLowerCase()) ||
              item.address.toLowerCase().includes(search.toLowerCase()) || 
              item.cpf.includes(search)
            );
          });
        setFilteredList(performSearch)
    },[filteredList, search])
    const reset = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        setFilteredList(patientsData)
        setSearch('')
    },[patientsData])
    return (
        <StyledContainer>
            <div id="overflow-area">
                <form onSubmit={submit} className="d-flex gap-3 mb-3">
                    <Input type="text" onChange={(e) => setSearch(e.target.value)} value={search}/>
                    <Button type="submit" className='bg-primary text-light'>Search</Button>
                    <Button type="button" className='bg-secondary text-light' onClick={reset}>Reset</Button>
                </form>
                <section>
                        {map(filteredList, (patient) => (
                            <Card key={patient.id} id="card">
                                <CardBody id="card-body">
                                    <CardContent id="patient">
                                        <i className="bi bi-person-circle text-secondary" id="icon"/>
                                        <div className='d-flex flex-column' >
                                            <Typography>{patient.firstName} {patient.lastName}</Typography>
                                            <Typography>{patient.email}</Typography>
                                        </div>
                                    </CardContent>
                                    <CardContent>
                                        <h5>Patient information:</h5>
                                        <Typography>birthdate: {patient.birthdate}</Typography>
                                        <Typography>CPF: {patient.cpf}</Typography>
                                        <Typography>Address: {patient.address}</Typography>
                                    </CardContent>
                                    <CardContent>
                                        <h5>Scheduled:</h5>
                                        <Typography>{patient.doctor}</Typography>
                                        <Typography>day: {patient.day}</Typography>
                                        <Typography>time: {patient.time}</Typography>
                                        <Typography>status: {patient.status}</Typography>
                                    </CardContent>
                                    <CardContent id="icon-container">
                                        <EditModal patientData={patient}/>
                                        <WarningModal destroy={() => destroy(patient.id as string)}/>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        ))}
                </section>
            </div>
        </StyledContainer>
    )
}
export default SchedulingViewContainer;