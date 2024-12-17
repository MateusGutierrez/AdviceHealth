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
        set((state) => ({
            schedule: state.schedule.map((currentSchedule) =>
                currentSchedule.date === newSchedule.date
                    ? {
                          ...currentSchedule,
                          dailySchedule: [
                              ...currentSchedule.dailySchedule,
                              ...(newSchedule.dailySchedule ?? []),
                          ],
                      }
                    : currentSchedule
            ),
        })),
      submitSchedule: (time: string, doctorName: string) => set((state) => ({
        schedule: state.schedule.map((currentSchedule) => ({
          ...currentSchedule,
          dailySchedule: currentSchedule.dailySchedule.filter((entry) => entry.doctorName !== doctorName || entry.time !== time),
        }))
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
      patientsData: [],
      addPatientData: (newPatient: AddPatientToScheduleFormValue) => set((state) => ({ patientsData: [...state.patientsData, newPatient ]}))
    }),
    {
      name: 'session-health-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
