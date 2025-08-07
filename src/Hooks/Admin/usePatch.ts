import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axiosInstance";
import {
  DataSiswaModel,
  type DataSiswaModelType,
  DataWaliMuridModel,
  type DataWaliMuridModelType,
} from "../../Models/AdminModels";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "../../Context/Context";
import { z } from "zod";

async function updateDataSiswa(
  id: string,
  data: DataSiswaModelType,
  token: string
) {
  const response = await axiosInstance.patch(`/api/admin/siswas/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function useUpdateDataSiswa(id: string) {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();

  const queryClient = useQueryClient();

  const {
    setValue,
    handleSubmit: handleSubmit_update,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DataSiswaModel),
  });
  const mutation = useMutation({
    mutationKey: ["update_data_siswa", id],
    mutationFn: (data: DataSiswaModelType) => updateDataSiswa(id, data, token),
    onSuccess: () => {
      stateHandle("update", true);
      queryClient.invalidateQueries({ queryKey: ["get_data_siswa_admin"] });
    },
    onError: () => {
      stateHandle("update", true);
    },
  });
  return {
    setValue,
    errors,
    handleSubmit_update,
    onSubmit_update: mutation.mutate,
    isLoading_update: mutation.isPending,
    isSuccess_update: mutation.isSuccess,
    isError_update: mutation.isError,
  };
}

async function updateDataWaliMurid(
  id: string,
  data: DataWaliMuridModelType,
  token: string
) {
  const response = await axiosInstance.patch(`/api/admin/update-wali-murid/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function useUpdateDataWaliMurid(id: string) {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();

  const queryClient = useQueryClient();

  const {
    setValue,
    handleSubmit: handleSubmit_update,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DataWaliMuridModel),
  });
  const mutation = useMutation({
    mutationKey: ["update_data_wali_murid", id],
    mutationFn: (data: DataWaliMuridModelType) => updateDataWaliMurid(id, data, token),
    onSuccess: () => {
      stateHandle("update", true);
      queryClient.invalidateQueries({ queryKey: ["get_data_wali_murid_admin"] });
    },
    onError: () => {
      stateHandle("update", true);
    },
  });
  return {
    setValue,
    errors,
    handleSubmit_update,
    onSubmit_update: mutation.mutate,
    isLoading_update: mutation.isPending,
    isSuccess_update: mutation.isSuccess,
    isError_update: mutation.isError,
  };
}

async function updateDataTutor(
  id: string,
  data: { name: string; email: string; password?: string; password_confirmation?: string },
  token: string
) {
  const response = await axiosInstance.patch(`/api/admin/update-tutor/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function useUpdateDataTutor(id: string) {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();

  const queryClient = useQueryClient();

  const {
    setValue,
    handleSubmit: handleSubmit_update,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Nama Tidak Boleh Kosong"),
        email: z.string().email("Email Tidak Valid"),
        password: z.string().optional(),
        password_confirmation: z.string().optional(),
      })
    ),
  });
  const mutation = useMutation({
    mutationKey: ["update_data_tutor", id],
    mutationFn: (data: { name: string; email: string; password?: string; password_confirmation?: string }) =>
      updateDataTutor(id, data, token),
    onSuccess: () => {
      stateHandle("update", true);
      queryClient.invalidateQueries({ queryKey: ["get_data_tutor_admin"] });
    },
    onError: () => {
      stateHandle("update", true);
    },
  });
  return {
    setValue,
    errors,
    handleSubmit_update,
    onSubmit_update: mutation.mutate,
    isLoading_update: mutation.isPending,
    isSuccess_update: mutation.isSuccess,
    isError_update: mutation.isError,
  };
}

async function updateDataEkskul(
  id: string,
  data: {
    namaEkskul: string;
    namaTutor: string;
    jumlahSiswa: number;
    status: string;
    tanggal: string;
  },
  token: string
) {
  const response = await axiosInstance.patch(`/api/admin/update-ekskul/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function useUpdateDataEkskul(id: string) {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();

  const queryClient = useQueryClient();

  const {
    setValue,
    handleSubmit: handleSubmit_update,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        namaEkskul: z.string().min(1, "Nama Ekstrakurikuler Tidak Boleh Kosong"),
        namaTutor: z.string().min(1, "Nama Tutor Tidak Boleh Kosong"),
        jumlahSiswa: z.number().min(1, "Jumlah Siswa Harus Lebih dari 0"),
        status: z.string().min(1, "Status Tidak Boleh Kosong"),
        tanggal: z.string().min(1, "Tanggal Tidak Boleh Kosong"),
      })
    ),
  });

  const mutation = useMutation({
    mutationKey: ["update_data_ekskul", id],
    mutationFn: (data: {
      namaEkskul: string;
      namaTutor: string;
      jumlahSiswa: number;
      status: string;
      tanggal: string;
    }) => updateDataEkskul(id, data, token),
    onSuccess: () => {
      stateHandle("update", true);
      queryClient.invalidateQueries({ queryKey: ["get_data_ekskul_admin"] });
    },
    onError: () => {
      stateHandle("update", true);
    },
  });

  return {
    setValue,
    errors,
    handleSubmit_update,
    onSubmit_update: mutation.mutate,
    isLoading_update: mutation.isPending,
    isSuccess_update: mutation.isSuccess,
    isError_update: mutation.isError,
  };
}