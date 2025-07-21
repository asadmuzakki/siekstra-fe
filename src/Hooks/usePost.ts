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

const absensiKegiatan = async (data: FormModelType) => {
  const response = await axiosInstance.post("api/absensi", data);
  return response.data;
};

export const useAbsensiKegiatan = () => {
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
    mutationFn: (data: FormModelType) => absensiKegiatan(data),
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
  data: KegiatanEkskulModelType
): Promise<KegiatanEkskulModelType> => {
  const response = await axiosInstance.post("/api/kegiatan", data);
  return response.data;
};

export function useKegiatanEkskul() {
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
    mutationFn: (data: KegiatanEkskulModelType) => kegiatanEkskul(data),
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
  data: AbsenTutorModelType
): Promise<AbsenTutorModelType> => {
  const response = await axiosInstance.post("/api/absensi-tutor", data);
  return response.data;
};

export const usePostAbsenTutor = () => {
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
    mutationFn: (data: AbsenTutorModelType) => postAbsenTutor(data),
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

const addNilaiEkskulTutor = async (data: NilaiEkskulModelType) => {
  const response = await axiosInstance.post("/api/nilais", data);
  return response.data;
};

export const useAddNilaiEkskulTutor = () => {
  const { register, setValue, handleSubmit, control } = useForm<NilaiEkskulModelType>({
    resolver: zodResolver(NilaiEkskulModel),
    defaultValues: {
      penilaians: [],
    },
  });
  const {fields} = useFieldArray({
    control,
    name: "penilaians",
  })
  const mutation = useMutation({
    mutationKey: ["add_nilai_ekskul"],
    mutationFn: (data: NilaiEkskulModelType) => addNilaiEkskulTutor(data),
    onSuccess: () => {
      alert("Nilai Berhasil Ditambahkan");
    },
    onError: (error) => {
      console.log(error);
      
      alert("Nilai Gagal Ditambahkan");
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
