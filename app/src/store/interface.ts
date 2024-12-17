import { AddPatientToScheduleFormValue } from "../schemas/AddPatientToScheduleSchema";

export interface dailySchedule{
    id?: string;
    time: string;
    patientName: string;
    doctorName: string;
    status: string;

}
export interface WeekStatistics {
    date: string;
    appointmentsToday: number;
    patientsServedToday: number;
    dailyRevenue: number;
    reminders: string[];
    dailySchedule: dailySchedule[];
}
export interface WeeklyAvailableSlots {
    [date: string]: string[];
  }
  export interface DoctorSchedule {
    doctorName: string;
    specialty: string;
    price: number;
    weeklyAvailableSlots: WeeklyAvailableSlots;
  }
  
export interface Schedule{
    date: Date | string;
    dailySchedule: dailySchedule[]
}
export interface Store {
    date: Date | string;
    setDate: (date: Date) => void;
    schedule: Schedule[];
    addToSchedule: (schedule: Schedule) => void;
    removeFromSchedule: (id: string) => void;
    submitSchedule: (time: string, doctorName: string) => void;
    weekStatistics: WeekStatistics[];
    doctorsSchedule: DoctorSchedule[];
    patientsData: AddPatientToScheduleFormValue[] | [];
    addPatientData: (newPatient: AddPatientToScheduleFormValue) => void;
}
