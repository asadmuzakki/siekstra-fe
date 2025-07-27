import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

import type {
  EkskulType,
  RekapAbsensiType,
  SiswaType,
} from "../Types/general.type";
import { useCookies } from "react-cookie";


const siswa = async (): Promise<SiswaType> => {
  const response = await axiosInstance.get("/api/tutor/siswas");
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
const siswa1 = async (id: string, token: string) => {
  const response = await axiosInstance.get(
    `/api/tutor/pendaftaranByEkskul/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useGetSiswa1 = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_siswa", id],
    queryFn: () => siswa1(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const ekskul = async (token: string, userId: string): Promise<EkskulType> => {
  const response = await axiosInstance.get(`api/tutor/ekskulByUser/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useGetEkskul = () => {
  const [cookie] = useCookies(["authToken", "user_id"]);
  const token = cookie.authToken;
  const userId = String(cookie.user_id);

  const { data, isLoading, isError, error } = useQuery<EkskulType>({
    queryKey: ["get_ekskul"],
    queryFn: () => ekskul(token, userId),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const riwayatAbsensi = async (
  id: string,
  token: string
): Promise<RekapAbsensiType> => {
  const response = await axiosInstance.get(`api/tutor/riwayat-absensi/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useRiwayatAbsensi = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery<RekapAbsensiType>({
    queryKey: ["get_riwayat_absensi", id],
    queryFn: () => riwayatAbsensi(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
const ekskulById = async (id: string, token:string): Promise<any> => {
  const response = await axiosInstance.get(`api/tutor/ekskul/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetEkskulById = (id: string) => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["get_ekskul"],
    queryFn: () => ekskulById(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
const absensiEkskulById = async (id: string, token:string): Promise<any> => {
  const response = await axiosInstance.get(`api/tutor/absensi/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetAbsensiEkskulById = (id: string) => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["get_absesnsi_ekskul_id", id],
    queryFn: () => absensiEkskulById(id, token),
    enabled: !!id,
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const riwayatKegiatan = async (id: string, token:string) => {
  const response = await axiosInstance.get(`/api/tutor/riwayat-kegiatan/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useRiwayatKegiatan = (id: string) => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["get_riwayat_kegiatan", id],
    queryFn: () => riwayatKegiatan(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const absensiKegiatanEkskulById = async (id: string, token:string) => {
  const response = await axiosInstance.get(`/api/tutor/kegiatan/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetAbsensiKegiatanEkskulById = (id: string) => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_kegiatan_ekskul_by_id", id],
    queryFn: () => absensiKegiatanEkskulById(id, token),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getAbsensiTutor = async (token:string) => {
  const response = await axiosInstance.get(`/api/tutor/absensi-tutor`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetAbsensiTutor = () => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_absensi_tutor"],
    queryFn: () => getAbsensiTutor(token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getAbsensiTutorById = async (id: string, token:string) => {
  const response = await axiosInstance.get(`/api/tutor/absensi-tutor/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetAbsensiByTutor = (id: string) => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_absensi_tutor_by_id", id],
    queryFn: () => getAbsensiTutorById(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
const getNilaiSiswaTutor = async (token:string, id:string, limit_page:string, page:string) => {
  const response = await axiosInstance.get(`/api/tutor/nilaiByEkskul/${id}/${limit_page}?page=${page}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetNilaiSiswaTutor = (id:string, entries:string, page:string) => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_nilai_siswa_tutor", id,entries, page],
    queryFn: () => getNilaiSiswaTutor(token, id, entries, page),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getNilaiSiswaTutorById = async (id: string, token:string) => {
  const response = await axiosInstance.get(`/api/tutor/nilais/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetNilaiSiswaTutorById = (id: string) => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_nilai_siswa_tutor_by_id"],
    queryFn: () => getNilaiSiswaTutorById(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
