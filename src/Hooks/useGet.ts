import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

import type {
  EkskulType,
  RekapAbsensiType,
  SiswaType,
} from "../Types/general.type";

const siswa = async (): Promise<SiswaType> => {
  const response = await axiosInstance.get("/api/siswas");
  return response.data;
};

export const useGetSiswa = () => {
  const { data, isLoading, isError, error } = useQuery<SiswaType>({
    queryKey: ["get_siswa1"],
    queryFn: () => siswa(),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
const siswa1 = async (id: string) => {
  const response = await axiosInstance.get(`/api/pendaftaranByEkskul/${id}`);
  return response.data;
};

export const useGetSiswa1 = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_siswa", id],
    queryFn: () => siswa1(id),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const ekskul = async (): Promise<EkskulType> => {
  const response = await axiosInstance.get("api/ekskul");
  return response.data;
};

export const useGetEkskul = () => {
  const { data, isLoading, isError, error } = useQuery<EkskulType>({
    queryKey: ["get_ekskul"],
    queryFn: () => ekskul(),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const riwayatAbsensi = async (id: string): Promise<RekapAbsensiType> => {
  const response = await axiosInstance.get(`api/riwayat-absensi/${id}`);
  return response.data;
};

export const useRiwayatAbsensi = (id: string) => {
  const { data, isLoading, isError, error } = useQuery<RekapAbsensiType>({
    queryKey: ["get_riwayat_absensi", id],
    queryFn: () => riwayatAbsensi(id),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
const ekskulById = async (id: string): Promise<any> => {
  const response = await axiosInstance.get(`api/ekskul/${id}`);
  return response.data;
};

export const useGetEkskulById = (id: string) => {
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["get_ekskul"],
    queryFn: () => ekskulById(id),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
const absensiEkskulById = async (id: string): Promise<any> => {
  const response = await axiosInstance.get(`api/absensi/${id}`);
  return response.data;
};

export const useGetAbsensiEkskulById = (id: string) => {
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["get_absesnsi_ekskul_id", id],
    queryFn: () => absensiEkskulById(id),
    enabled: !!id,
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const riwayatKegiatan = async (id: string) => {
  const response = await axiosInstance.get(`/api/riwayat-kegiatan/${id}`);
  return response.data;
};

export const useRiwayatKegiatan = (id: string) => {
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["get_riwayat_kegiatan", id],
    queryFn: () => riwayatKegiatan(id),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const absensiKegiatanEkskulById = async (id: string) => {
  const response = await axiosInstance.get(`/api/kegiatan/${id}`);
  return response.data;
};

export const useGetAbsensiKegiatanEkskulById = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_kegiatan_ekskul_by_id", id],
    queryFn: () => absensiKegiatanEkskulById(id),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getAbsensiTutor = async () => {
  const response = await axiosInstance.get(`/api/absensi-tutor`);
  return response.data;
};

export const useGetAbsensiTutor = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_absensi_tutor"],
    queryFn: () => getAbsensiTutor(),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getAbsensiTutorById = async (id: string) => {
  const response = await axiosInstance.get(`/api/absensi-tutor/${id}`);
  return response.data;
};

export const useGetAbsensiByTutor = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_absensi_tutor_by_id", id],
    queryFn: () => getAbsensiTutorById(id),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
const getNilaiSiswaTutor = async () => {
  const response = await axiosInstance.get(`/api/nilais`);
  return response.data;
};

export const useGetNilaiSiswaTutor = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_nilai_siswa_tutor"],
    queryFn: () => getNilaiSiswaTutor(),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getNilaiSiswaTutorById = async (id: string) => {
  const response = await axiosInstance.get(`/api/nilais/${id}`);
  return response.data;
};

export const useGetNilaiSiswaTutorById = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_nilai_siswa_tutor_by_id"],
    queryFn: () => getNilaiSiswaTutorById(id),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
