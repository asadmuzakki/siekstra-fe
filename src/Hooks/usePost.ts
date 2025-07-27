import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import {
  AbsenTutorModel,
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

const absensiKegiatan = async (data: FormModelType, token: string) => {
  const response = await axiosInstance.post("api/tutor/absensi", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useAbsensiKegiatan = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();
  const { register, control, handleSubmit, setValue } = useForm<FormModelType>({
    resolver: zodResolver(FormModel),
    defaultValues: {
      absensis: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "absensis",
  });

  const mutation = useMutation({
    mutationKey: ["absensi"],
    mutationFn: (data: FormModelType) => absensiKegiatan(data, token),
    onSuccess: () => {
      stateHandle("post", true);
    },
    onError: () => {
      stateHandle("post", true);
    },
  });
  return {
    register,
    handleSubmit,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
    success_message: "Absen Berhasil",
    error_message: "Absen Gagal",
    fields,
    setValue,
  };
};

const kegiatanEkskul = async (
  data: KegiatanEkskulModelType,
  token: string
): Promise<KegiatanEkskulModelType> => {
  const response = await axiosInstance.post("/api/tutor/kegiatan", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function useKegiatanEkskul() {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { register, handleSubmit, control, setValue } =
    useForm<KegiatanEkskulModelType>({
      resolver: zodResolver(KegiatanEkskulModel),
    });

  const { fields } = useFieldArray({
    control,
    name: "absensis",
  });
  const { stateHandle } = useGlobalContext();
  const mutation = useMutation({
    mutationKey: ["kegiatan"],
    mutationFn: (data: KegiatanEkskulModelType) => kegiatanEkskul(data, token),
    onSuccess: () => {
      stateHandle("post", true);
    },
    onError: () => {
      stateHandle("post", true);
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
}

const postAbsenTutor = async (
  data: AbsenTutorModelType,
  token: string
): Promise<AbsenTutorModelType> => {
  const response = await axiosInstance.post("/api/tutor/absensi-tutor", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const usePostAbsenTutor = () => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;
  const { stateHandle } = useGlobalContext();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AbsenTutorModelType>({
    resolver: zodResolver(AbsenTutorModel),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AbsenTutorModelType) => postAbsenTutor(data, token),
    mutationKey: ["post_absen_tutor"],
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["get_absensi_tutor"] });
      stateHandle("post", true);
    },
    onError: () => {
      reset();
      stateHandle("post", true);
    },
  });
  return {
    register,
    handleSubmit,
    setValue,
    errors,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
  };
};

const addNilaiEkskulTutor = async (
  data: NilaiEkskulModelType,
  token: string
) => {
  const response = await axiosInstance.post("/api/tutor/nilais", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useAddNilaiEkskulTutor = () => {
  const [cookies] = useCookies(["authToken"]);
  const { stateHandle } = useGlobalContext();
  const token = cookies.authToken;
  const {
    register,
    setValue,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<NilaiEkskulModelType>({
    resolver: zodResolver(NilaiEkskulModel),
    defaultValues: {
      penilaians: [],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "penilaians",
  });
  const mutation = useMutation({
    mutationKey: ["add_nilai_ekskul"],
    mutationFn: (data: NilaiEkskulModelType) =>
      addNilaiEkskulTutor(data, token),
    onSuccess: () => {
      stateHandle("post", true);
   
    },
    onError: (error) => {
      console.log(error);

      stateHandle("post", true);
    },
  });
  return {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    watch,
    fields,
    onSubmit: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
  };
};
