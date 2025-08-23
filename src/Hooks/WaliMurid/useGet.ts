import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axiosInstance";
import { useCookies } from "react-cookie";

const getDataAnak = async (token: string) => {
  const response = await axiosInstance.get("/api/wali_murid/anak-wali", {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
  return response.data;
};

export const useGetDataAnak = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_anak_wali"],
    queryFn: () => getDataAnak(token),
  });
  return {
    data,isLoading,isError,error
  }
};

// ==================== ABSENSI ====================
const getAbsensiBySiswa = async (token: string, siswaId: string, tahun?: string) => {
  const url = tahun 
    ? `/api/wali_murid/absensiBySiswa/${siswaId}/${tahun}` 
    : `/api/wali_murid/absensiBySiswa/${siswaId}`;

  const response = await axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useGetAbsensiBySiswa = (siswaId: string, tahun?: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;

  return useQuery({
    queryKey: ["get_absensi_by_siswa", siswaId, tahun],
    queryFn: () => getAbsensiBySiswa(token, siswaId, tahun),
    enabled: !!token && !!siswaId,
  });
};

// ==================== NILAI ====================
const getNilaiBySiswa = async (token: string, siswaId: string, tahun?: string) => {
  const url = tahun 
    ? `/api/wali_murid/nilaiBySiswa/${siswaId}/${tahun}` 
    : `/api/wali_murid/nilaiBySiswa/${siswaId}`;

  const response = await axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useGetNilaiBySiswa = (siswaId: string, tahun?: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;

  return useQuery({
    queryKey: ["get_nilai_by_siswa", siswaId, tahun],
    queryFn: () => getNilaiBySiswa(token, siswaId, tahun),
    enabled: !!token && !!siswaId,
  });
};

// ==================== KEGIATAN ====================
const getKegiatanBySiswa = async (token: string, siswaId: string, tahun?: string) => {
  const url = tahun 
    ? `/api/wali_murid/kegiatanBySiswa/${siswaId}/${tahun}` 
    : `/api/wali_murid/kegiatanBySiswa/${siswaId}`;

  const response = await axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useGetKegiatanBySiswa = (siswaId: string, tahun?: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;

  return useQuery({
    queryKey: ["get_kegiatan_by_siswa", siswaId, tahun],
    queryFn: () => getKegiatanBySiswa(token, siswaId, tahun),
    enabled: !!token && !!siswaId,
  });
};

const getEkskulForWali = async (token: string) => {
  const response = await axiosInstance.get(`/api/wali_murid/ekskulForWali`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // langsung return body
};

// custom hook
export const useGetEkskulForWali = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;

  return useQuery({
    queryKey: ["ekskulForWali"], // cache key
    queryFn: () => getEkskulForWali(token),
    enabled: !!token, // hanya jalan kalau token ada
  });
};

const getEkskul = async (token: string) => {
  const response = await axiosInstance.get(`/api/wali_murid/getEkskul`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // langsung return body
};


export const useGetEkskul = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;

  return useQuery({
    queryKey: ["ekskul"], // cache key
    queryFn: () => getEkskul(token),
    enabled: !!token, // hanya jalan kalau token ada
  });
};


