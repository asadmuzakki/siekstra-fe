import { useCookies } from "react-cookie";
import { axiosInstance } from "../../lib/axiosInstance";
import {
  DataSiswaModel,
  type DataSiswaModelType,
} from "../../Models/AdminModels";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalContext } from "../../Context/Context";

const createDataSiswa = async (data: DataSiswaModelType, token: string) => {
  const response = await axiosInstance.post("/api/admin/siswas", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useCreateDataSiswa = () => {
  const [cookies] = useCookies(["authToken"]);
  const { stateHandle } = useGlobalContext();
  const token = cookies.authToken;
  const query = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DataSiswaModelType>({
    resolver: zodResolver(DataSiswaModel),
  });
  const mutation = useMutation({
    mutationKey: ["create_data_siswa"],
    mutationFn: (data: DataSiswaModelType) => createDataSiswa(data, token),
    onSuccess: () => {
      reset()
      stateHandle("post", true);
      query.invalidateQueries({ queryKey: ["get_data_siswa_admin"] });
    },
    onError: () => {
      stateHandle("post", true);

    },
  });
  return {
    register,
    handleSubmit,
    errors,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
   
  };
};

const createDataWaliMurid = async (
  data: { name: string; email: string; password: string; password_confirmation: string },
  token: string
) => {
  const response = await axiosInstance.post("/api/admin/add-wali-murid", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useCreateDataWaliMurid = () => {
  const [cookies] = useCookies(["authToken"]);
  const { stateHandle } = useGlobalContext();
  const token = cookies.authToken;
  const query = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>();
  const mutation = useMutation({
    mutationKey: ["create_data_wali_murid"],
    mutationFn: (data: { name: string; email: string; password: string; password_confirmation: string }) =>
      createDataWaliMurid(data, token),
    onSuccess: () => {
      reset();
      stateHandle("post", true);
      query.invalidateQueries({ queryKey: ["get_data_wali_murid_admin"] });
    },
    onError: () => {
      stateHandle("post", true);
    },
  });
  return {
    register,
    handleSubmit,
    errors,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
  };
};

