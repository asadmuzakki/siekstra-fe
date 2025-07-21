import type { SiswaModelType } from "../Models/siswa.model";


export type AbsenType = {
  siswa_id: number;
    status: "Hadir" | "Izin" | "Alpha" | 'Sakit';
  keterangan: string;
};

export type SiswaType = {
  data: SiswaModelType[];
  message: string;
  status: boolean;
};

export type EkskulType = {
  data: {
    id: number;
    nama_ekskul: string;
  }[];
};

export type RekapAbsensiType = {
  data: {
    id: number;
    agenda: string;
    tanggal: string; // atau bisa pakai Date jika ingin di-convert
    jumlah_siswa: number;
    hadir: number;
    sakit: number;
    izin: number;
    alpa: number;
  };
};

// export type KegiatanEkskulType = {
//    ekskul_id: number;
//   nama_kegiatan: string;
//   kategori: string;
//   tingkat: string;
//   tanggal_kegiatan: string; // bisa ubah ke Date jika kamu konversi
//   absensis: AbsenType[];
// }