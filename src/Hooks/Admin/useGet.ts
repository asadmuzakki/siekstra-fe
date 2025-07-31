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
