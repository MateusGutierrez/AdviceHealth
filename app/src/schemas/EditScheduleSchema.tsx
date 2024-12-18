import { z } from "zod";

export const EditScheduleSchema = z.object({
    patient: z.string(),
    time:z.string(),
    date: z.string(),
    doctor: z.string().optional(),
    status:z.string(), 
  });
  
  export type EditScheduleFormValue = z.infer<typeof EditScheduleSchema>;