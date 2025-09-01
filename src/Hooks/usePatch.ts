/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import {

  FormModel,
  KegiatanEkskulModel,
  NilaiEkskulModel,
  type AbsenTutorModelType,
  type FormModelType,
  type KegiatanEkskulModelType,
  type NilaiEkskulModelType,
} from "../Models/ekskul.model";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalContext } from "../Context/Context";
import { useCookies } from "react-cookie";

const updateAbsensiEkskul = async (
  id: string,
  data: FormModelType,
  token: string
) => {
  const response = await axiosInstance.patch(`api/tutor/absensi/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useUpdateAbsensiEkskul = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();
  const { register, handleSubmit, setValue, control } = useForm<FormModelType>({
    resolver: zodResolver(FormModel),
    defaultValues: {
      absensis: [],
    },
  });

  const queryClient = useQueryClient();
  const { fields } = useFieldArray({
    control,
    name: "absensis",
  });
  const mutation = useMutation({
    mutationKey: ["update_absensi_ekskul"],
    mutationFn: (data: FormModelType) => updateAbsensiEkskul(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_absesnsi_ekskul_id"] });
      stateHandle("update", true);
    },
    onError: () => {
      stateHandle("update", true);
    },
  });
  return {
    register,
    handleSubmit,
    setValue,
    fields,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
  };
};

const updateAbsensiKegiatan = async (
  id: string,
  data: KegiatanEkskulModelType,
  token: string
) => {
  const response = await axiosInstance.patch(`api/tutor/kegiatan/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useUpdateAbsensiKegiatan = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();
  const { register, handleSubmit, setValue, control } =
    useForm<KegiatanEkskulModelType>({
      resolver: zodResolver(KegiatanEkskulModel),
      defaultValues: {
        absensis: [],
      },
    });

  const queryClient = useQueryClient();
  const { fields } = useFieldArray({
    control,
    name: "absensis",
  });
  const mutation = useMutation({
    mutationKey: ["update_absensi_kegiatan"],
    mutationFn: (data: KegiatanEkskulModelType) =>
      updateAbsensiKegiatan(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_kegiatan_ekskul_by_id"],
      });
      stateHandle("update", true);
    },
    onError: () => {
      stateHandle("update", true);
    },
  });
  return {
    register,
    handleSubmit,
    setValue,
    fields,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
  };
};

const updateAbsenTutor = async (
  id: string,
  data: AbsenTutorModelType,
  token: string
) => {
  const response = await axiosInstance.patch(
    `/api/tutor/absensi-tutor/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useUpdateAbsenTutor = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();
  const { register, handleSubmit, setValue } = useForm<AbsenTutorModelType>({});
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update_absen_tutor", id],
    mutationFn: (data: AbsenTutorModelType) =>
      updateAbsenTutor(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_absensi_tutor"] });
      stateHandle("update", true);
    },
    onError: (err) => {
      console.log(err);

      stateHandle("update", true);
    },
  });
  return {
    register,
    handleSubmit,
    setValue,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
  };
};
const updateNilaiSiswaByTutor = async (
  id: string,
  data: NilaiEkskulModelType,
  token: string
) => {
  const response = await axiosInstance.patch(`/api/tutor/nilais/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useupdateNilaiSiswaByTutor = (id: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();
  const { register, handleSubmit, setValue, control } =
    useForm<NilaiEkskulModelType>({
      resolver: zodResolver(NilaiEkskulModel),
    });
  const { fields } = useFieldArray({
    control,
    name: "penilaians",
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update_absen_tutor", id],
    mutationFn: (data: NilaiEkskulModelType) =>
      updateNilaiSiswaByTutor(id, data, token),
    onSuccess: () => {
  
      queryClient.invalidateQueries({ queryKey: ["get_nilai_siswa_tutor_by_id"] });
      stateHandle("update", true);
    },
    onError: (err) => {
      console.log(err);

      stateHandle("update", true);
    },
  });
  return {
    register,
    handleSubmit,
    setValue,
    fields,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
  };
};
