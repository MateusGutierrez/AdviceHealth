import { z } from 'zod';

const isValidCPF = (cpf: string): boolean => {
  const sanitizedCPF = cpf.replace(/\D/g, '');
  if (sanitizedCPF.length !== 11 || /^(\d)\1+$/.test(sanitizedCPF))
    return false;

  const calculateDigit = (factor: number): number => {
    const total = sanitizedCPF
      .slice(0, factor - 1)
      .split('')
      .reduce(
        (sum, num, index) => sum + parseInt(num, 10) * (factor - index),
        0
      );
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calculateDigit(10);
  const digit2 = calculateDigit(11);

  return (
    digit1 === parseInt(sanitizedCPF[9], 10) &&
    digit2 === parseInt(sanitizedCPF[10], 10)
  );
};

export const AddPatientToScheduleSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  cpf: z
    .string()
    .min(11, 'CPF must have at least 11 digits')
    .max(14, 'CPF must have at most 14 characters (including punctuation)')
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'invalid CPF format')
    .refine(isValidCPF, { message: 'invalid CPF' }),
  birthdate: z.string(),
  address: z.string(),
  day: z.string(),
  time: z.string(),
  doctor: z.string().optional(),
  status: z.string(),
});

export type AddPatientToScheduleFormValue = z.infer<
  typeof AddPatientToScheduleSchema
>;
