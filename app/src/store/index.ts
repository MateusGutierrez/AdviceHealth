import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Store } from './interface';

export const useStore = create<Store>()(
  persist(
    (set) => ({
      date: new Date(),
      setDate: (date: Date) => set(() => ({ date })),
    }),
    {
      name: 'session-health-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
