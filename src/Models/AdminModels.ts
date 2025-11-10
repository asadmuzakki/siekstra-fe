import { z } from "zod";

export const DataSiswaModel = z.object({
  nis: z.string().min(1, "NIS Tidak Boleh Kosong"),
  nama: z.string().min(1, "Nama Tidak Boleh Kosong"),
  email_ortu: z.string().email("Email Tidak Valid"),
  kelas: z.string().min(1, "Kelas Tidak Boleh Kosong"),
  nama_ortu: z.string().min(1, "Nama Orang Tua Tidak Boleh Kosong"),
  jenis_kelamin: z.string().min(1, "Jenis Kelamin Tidak Boleh Kosong"),
});

export type DataSiswaModelType = z.infer<typeof DataSiswaModel>;

export const DataWaliMuridModel = z.object({
  name: z.string().min(1, "Nama Tidak Boleh Kosong"),
  email: z.string().email("Email Tidak Valid"),
  password: z.string().min(6, "Password Minimal 6 Karakter"),
  password_confirmation: z
    .string()
    .min(6, "Konfirmasi Password Minimal 6 Karakter"),
});

export type DataWaliMuridModelType = z.infer<typeof DataWaliMuridModel>;

export const DataKelasEkskulModel = z.object({
  ekskul_id: z.number(),
  nama_kelas: z.string(),
  tahun_ajaran: z.string(),
  periode: z.string(),
  status: z.string(),
});

export type DataKelasEkskulModelType = z.infer<typeof DataKelasEkskulModel>;
