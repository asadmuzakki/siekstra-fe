import { z } from "zod";

const AbsensiModel = z.object({
  siswa_id: z.number(),
  status: z.enum(["Hadir", "Izin", "Sakit", "Alpha"]),
  keterangan: z.string(),
});

export const FormModel = z.object({
  ekskul_id: z.number(),
  tanggal: z.string(),
  agenda: z.string(),
  absensis: z.array(z.any()),
});

export type FormModelType = z.infer<typeof FormModel>;

export const KegiatanEkskulModel = z.object({
  kelas_ekskul_id: z.number(),
  nama_kegiatan: z.string(),
  kategori: z.enum(["lomba", "non-lomba", "lainnya"]),
  tingkat: z.enum(["sekolah", "kota", "provinsi", "nasional"]),
  tanggal_kegiatan: z.string(),
  absensis: z.array(AbsensiModel),
});

export type KegiatanEkskulModelType = z.infer<typeof KegiatanEkskulModel>;

export const AbsenTutorModel = z.object({
  ekskul_id: z.number({
    required_error: "Ekskul harus diisi",
    invalid_type_error: "Ekskul harus berupa angka",
  }),
  keterangan: z.string().optional(), // jika boleh kosong
  status: z.enum(["Hadir", "Sakit", "Izin", "Alpha"], {
    required_error: "Status wajib diisi",
    invalid_type_error: "Status tidak valid",
  }),
  tanggal: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Tanggal harus dalam format YYYY-MM-DD",
  }),
  tutor_id: z.number({
    required_error: "Tutor wajib diisi",
    invalid_type_error: "Tutor harus berupa angka",
  }),
});

export type AbsenTutorModelType = z.infer<typeof AbsenTutorModel>;

const NilaiModel = z.object({
  siswa_id: z.number(),
  kehadiran: z.string(),
  keaktifan: z.string(),
  praktik: z.string(),
  keterangan: z.string(),
});
export const NilaiEkskulModel = z.object({
  ekskul_id: z.number(),
  tanggal: z.string().min(1, "Tanggal Tidak Boleh Kosong"),
  penilaians: z.array(NilaiModel),
});

export type NilaiEkskulModelType = z.infer<typeof NilaiEkskulModel>;
