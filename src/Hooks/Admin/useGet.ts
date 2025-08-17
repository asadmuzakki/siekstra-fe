import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axiosInstance";
import { useCookies } from "react-cookie";

const getDataSiswaAdmin = async (token: string) => {
  const response = await axiosInstance.get("/api/admin/siswas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataSiswaAdmin = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_siswa_admin"],
    queryFn: () => getDataSiswaAdmin(token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getDataSiswaAdminByAdmin = async (id: string, token: string) => {
  const response = await axiosInstance.get(`/api/admin/siswas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataSiswaAdminByAdmin = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_siswa_admin_by_id", id],
    queryFn: () => getDataSiswaAdminByAdmin(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getDataWaliMuridAdmin = async (token: string) => {
  const response = await axiosInstance.get("/api/admin/getWaliMurids", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataWaliMuridAdmin = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_wali_murid_admin"],
    queryFn: () => getDataWaliMuridAdmin(token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getDataTutorAdmin = async (token: string) => {
  const response = await axiosInstance.get("/api/admin/getTutors", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataTutorAdmin = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_tutor_admin"],
    queryFn: () => getDataTutorAdmin(token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getDataTutorById = async (id: string, token: string) => {
  const response = await axiosInstance.get(`/api/admin/getTutor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataTutorById = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_tutor_by_id", id],
    queryFn: () => getDataTutorById(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getDataEkskulAdmin = async (token: string) => {
  const response = await axiosInstance.get("/api/admin/ekskul", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataEkskulAdmin = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_ekskul_admin"],
    queryFn: () => getDataEkskulAdmin(token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getDataEkskulById = async (id: string, token: string) => {
  const response = await axiosInstance.get(`/api/admin/ekskul/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataEkskulById = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_ekskul_by_id", id],
    queryFn: () => getDataEkskulById(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getDataAbsensiTutor = async (token: string) => {
  const response = await axiosInstance.get("/api/admin/absensi-tutor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataAbsensiTutor = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_absensi_tutor"],
    queryFn: () => getDataAbsensiTutor(token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getDataWaliById = async (id: string, token: string) => {
  const response = await axiosInstance.get(`/api/admin/getWaliMurid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetDataWaliById = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_data_wali_by_id", id],
    queryFn: () => getDataWaliById(id, token),
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getRekapPenilaian = async (
  token: string,
  tahun?: string,
  sort_by?: string,
  sort_order?: string
) => {
  const params: Record<string, string> = {};
  if (tahun) params.tahun = tahun;
  if (sort_by) params.sort_by = sort_by;
  if (sort_order) params.sort_order = sort_order;

  const response = await axiosInstance.get("/api/admin/nilaiByDetail", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};

export const useGetRekapPenilaian = (
  tahun?: string,
  sort_by?: string,
  sort_order?: string
) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["rekap_penilaian", tahun, sort_by, sort_order],
    queryFn: () => getRekapPenilaian(token, tahun, sort_by, sort_order),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const getRekapAbsensi = async (
  token: string,
  tahun?: string,
  sort_by?: string,
  sort_order?: string
) => {
  const params: Record<string, string> = {};
  if (tahun) params.tahun = tahun;
  if (sort_by) params.sort_by = sort_by;
  if (sort_order) params.sort_order = sort_order;

  const response = await axiosInstance.get("/api/admin/absensiByDetail", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};

export const useGetRekapAbsensi = (
  tahun?: string,
  sort_by?: string,
  sort_order?: string
) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["rekap_absensi", tahun, sort_by, sort_order],
    queryFn: () => getRekapAbsensi(token, tahun, sort_by, sort_order),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};




