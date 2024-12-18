import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Schedule, Store } from './interface';
import mockdata from '../data/data.json'
import { map } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { AddPatientToScheduleFormValue } from '../schemas/AddPatientToScheduleSchema';

const initialScheduleValue = () => {
  return map(mockdata.weekStatistics, (stat) => ({
    date: stat.date,
    dailySchedule: stat.dailySchedule.map((entry) => ({
      id: uuidv4(),
      time: entry.time,
      patientName: entry.patientName,
      doctorName: entry.doctorName,
      status: entry.status,
    })),
  }));
};


export const useStore = create<Store>()(
  persist(
    (set) => ({
      date: new Date(),
      setDate: (date: Date) => set(() => ({ date })),
      schedule: initialScheduleValue(),
      addToSchedule: (newSchedule: Schedule) =>
        set((state) => {
            const exists = state.schedule.some(
                (currentSchedule) => currentSchedule.date === newSchedule.date
            );
            return {
                schedule: exists
                    ? state.schedule.map((currentSchedule) =>
                          currentSchedule.date === newSchedule.date
                              ? {
                                    ...currentSchedule,
                                    dailySchedule: [
                                        ...currentSchedule.dailySchedule,
                                        ...(newSchedule.dailySchedule ?? []),
                                    ],
                                }
                              : currentSchedule
                      )
                    : [
                          ...state.schedule,
                          {
                              date: newSchedule.date,
                              dailySchedule: newSchedule.dailySchedule,
                          },
                      ],
            };
        }),
      editSchedule: (id: string, updatedData: Partial<Schedule['dailySchedule'][number]>) =>
          set((state) => ({
            schedule: state.schedule.map((currentSchedule) => ({
              ...currentSchedule,
              dailySchedule: currentSchedule.dailySchedule.map((entry) =>
                entry.id === id
                  ? { ...entry, ...updatedData }
                  : entry
              ),
            })),
          })),        
      submitSchedule: (time: string, doctorName: string) =>
            set((state) => ({
              doctorsSchedule: state.doctorsSchedule.map((doctor) =>
                doctor.doctorName === doctorName
                  ? {
                      ...doctor,
                      weeklyAvailableSlots: Object.fromEntries(
                        Object.entries(doctor.weeklyAvailableSlots).map(([date, slots]) => [
                          date,
                          slots.filter((slot) => slot !== time),
                        ])
                      ),
                    }
                  : doctor
              ),
            })),
      removeFromSchedule: (id: string) => set((state) => ({
        schedule: state.schedule.map((currentSchedule) => ({
            ...currentSchedule,
              dailySchedule: currentSchedule.dailySchedule.filter(
                (entry) => entry.id !== id
              ),
          })),
      })),
      weekStatistics: mockdata.weekStatistics,
      doctorsSchedule: mockdata.doctorsSchedule,
      destroyOneDayOffSchedule: (doctorName: string, day: string) =>
        set((state) => ({
          doctorsSchedule: state.doctorsSchedule.map((schedule) => {
            if (schedule.doctorName === doctorName) {
              const updatedWeeklySlots = Object.fromEntries(
                Object.entries(schedule.weeklyAvailableSlots).filter(
                  ([slotDay]) => slotDay !== day
                )
              );
              return {
                ...schedule,
                weeklyAvailableSlots: updatedWeeklySlots,
              };
            }
            return schedule;
          }),
        })),
      patientsData: [],
      addPatientData: (newPatient: AddPatientToScheduleFormValue) => set((state) => ({ patientsData: [...state.patientsData, newPatient ]})),
      destroyPatientData: (id: string) => set((state) => ({patientsData: state.patientsData.filter((patient) => patient.id !== id)})),
      updatePatientData: (updatedPatientData) => set((state) => ({patientsData: state.patientsData.map((patient) => patient.id === updatedPatientData.id ? updatedPatientData : patient),})),
      dayOff: undefined,
      setDayOff: (dayOff: Date) => set(() => ({ dayOff })),
    }),
    {
      name: 'session-health-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
