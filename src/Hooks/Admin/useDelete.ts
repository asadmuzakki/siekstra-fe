import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axiosInstance";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "../../Context/Context";

const deleteDataSiswaById = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/api/admin/siswas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useDeleteDataSiswaById = () => {
  const [cookies] = useCookies(["authToken"]);
  const { stateHandle } = useGlobalContext();
  const token = cookies.authToken;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete_data_siswa_by_id"],
    mutationFn: (id: string) => deleteDataSiswaById(id, token),
    onSuccess: () => {
      stateHandle("delete", true);
      queryClient.invalidateQueries({ queryKey: ["get_data_siswa_admin"] });
    },
    onError: (err) => {
      console.log(err);

      stateHandle("delete", true);
    },
  });
  return {
    onDelete: mutation.mutate,
    isLoadingDelete: mutation.isPending,
    successDelete: mutation.isSuccess,
    errorDelete: mutation.isError,
  };
};

const deleteDataWaliMuridById = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/api/admin/delete-wali-murid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useDeleteDataWaliMuridById = () => {
  const [cookies] = useCookies(["authToken"]);
  const { stateHandle } = useGlobalContext();
  const token = cookies.authToken;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete_data_wali_murid_by_id"],
    mutationFn: (id: string) => deleteDataWaliMuridById(id, token),
    onSuccess: () => {
      stateHandle("delete", true);
      queryClient.invalidateQueries({ queryKey: ["get_data_wali_murid_admin"] });
    },
    onError: (err) => {
      console.log(err);
      stateHandle("delete", true);
    },
  });
  return {
    onDelete: mutation.mutate,
    isLoadingDelete: mutation.isPending,
    successDelete: mutation.isSuccess,
    errorDelete: mutation.isError,
  };
};

const deleteDataTutorById = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/api/admin/delete-tutor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useDeleteDataTutorById = () => {
  const [cookies] = useCookies(["authToken"]);
  const { stateHandle } = useGlobalContext();
  const token = cookies.authToken;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete_data_tutor_by_id"],
    mutationFn: (id: string) => deleteDataTutorById(id, token),
    onSuccess: () => {
      stateHandle("delete", true);
      queryClient.invalidateQueries({ queryKey: ["get_data_tutor_admin"] });
    },
    onError: (err) => {
      console.log(err);
      stateHandle("delete", true);
    },
  });
  return {
    onDelete: mutation.mutate,
    isLoadingDelete: mutation.isPending,
    successDelete: mutation.isSuccess,
    errorDelete: mutation.isError,
  };
};

const deleteDataEkskulById = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/api/admin/ekskul/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useDeleteDataEkskulById = () => {
  const [cookies] = useCookies(["authToken"]);
  const { stateHandle } = useGlobalContext();
  const token = cookies.authToken;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete_data_ekskul_by_id"],
    mutationFn: (id: string) => deleteDataEkskulById(id, token),
    onSuccess: () => {
      stateHandle("delete", true);
      queryClient.invalidateQueries({ queryKey: ["get_data_ekskul_admin"] });
    },
    onError: (err) => {
      console.log(err);
      stateHandle("delete", true);
    },
  });
  return {
    onDelete: mutation.mutate,
    isLoadingDelete: mutation.isPending,
    successDelete: mutation.isSuccess,
    errorDelete: mutation.isError,
  };
};