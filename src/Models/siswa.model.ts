import { z } from "zod";

export const SiswaModel = z.object({
  id: z.number(),
  nama: z.string(),
  nis: z.string(),
  email_ortu: z.string().email("Email tidak valid"),
  kelas: z.string(),
  nama_ortu: z.string(),
});

export type SiswaModelType = z.infer<typeof SiswaModel>;
