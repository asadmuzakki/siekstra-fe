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
    reset,
  } = useForm<DataSiswaModelType>({
    resolver: zodResolver(DataSiswaModel),
  });
  const mutation = useMutation({
    mutationKey: ["create_data_siswa"],
    mutationFn: (data: DataSiswaModelType) => createDataSiswa(data, token),
    onSuccess: () => {
      reset();
      stateHandle("post", true);
      query.invalidateQueries({ queryKey: ["get_data_siswa_admin"] });
    },
    onError: (err) => {
      stateHandle("post", true);
      console.log(err);
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
  data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  },
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
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => createDataWaliMurid(data, token),
    onSuccess: () => {
      reset();
      stateHandle("post", true);
      stateHandle("successCreate", true);
      alert("Create Wali Murid Berhasil");
      query.invalidateQueries({ queryKey: ["get_data_wali_murid_admin"] });
    },
    onError: (err) => {
      console.log(err);

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

const createDataTutor = async (
  data: { name: string; email: string },
  token: string
) => {
  const response = await axiosInstance.post("/api/admin/add-tutor", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useCreateDataTutor = () => {
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
    mutationKey: ["create_data_tutor"],
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => createDataTutor(data, token),
    onSuccess: () => {
      reset();
      stateHandle("post", true);
      query.invalidateQueries({ queryKey: ["get_data_tutor_admin"] });
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


const createDataEkskul = async (
  data: {
    namaEkskul: string;
    deskripsi: string;
    jadwal: string;
    tempat: string;
    tutorId: number; // ✅ ubah ke number
    status: string;
    kelasMin: number;
    kelasMax: number;
    foto?: File | null; // ✅ file tunggal
  },
  token: string
) => {
  const formData = new FormData();
  formData.append("nama_ekskul", data.namaEkskul);
  formData.append("deskripsi", data.deskripsi);
  formData.append("jadwal", data.jadwal);
  formData.append("tempat", data.tempat);
  formData.append("tutor_id", String(data.tutorId));
  formData.append("status", data.status);
  formData.append("kelas_min", String(data.kelasMin));
  formData.append("kelas_max", String(data.kelasMax));

  if (data.foto) {
    formData.append("foto", data.foto); // ✅ kirim File langsung
  }

  // debug log
  console.log("📦 Payload Ekskul (FormData):");
  formData.forEach((val, key) => console.log(key, val));

  const response = await axiosInstance.post("/api/admin/ekskul", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useCreateDataEkskul = () => {
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
    namaEkskul: string;
    deskripsi: string;
    jadwal: string;
    tempat: string;
    tutorId: number;
    status: string;
    kelasMin: number;
    kelasMax: number;
    // ⚠️ foto dihapus dari register
  }>();

  const mutation = useMutation({
    mutationKey: ["create_data_ekskul"],
    mutationFn: (data: {
      namaEkskul: string;
      deskripsi: string;
      jadwal: string;
      tempat: string;
      tutorId: number;
      status: string;
      kelasMin: number;
      kelasMax: number;
      foto?: File | null;
    }) => createDataEkskul(data, token),
    onSuccess: () => {
      reset();
      stateHandle("post", true);
      query.invalidateQueries({ queryKey: ["get_data_ekskul_admin"] });
    },
    onError: (err) => {
      console.error("❌ Gagal create ekskul:", err);
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

const createDataAbsensiTutor = async (
  data: {
    tutor_id: number;
    ekskul_id: number;
    tanggal: string;
    status: "Hadir" | "Alpha" | "Izin" | "Sakit";
    keterangan?: string;
  },
  token: string
) => {
  const response = await axiosInstance.post("/api/admin/absensi-tutor", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useCreateDataAbsensiTutor = () => {
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
    tutor_id: number;
    ekskul_id: number;
    tanggal: string;
    status: "Hadir" | "Alpha" | "Izin" | "Sakit";
    keterangan?: string;
  }>();

  const mutation = useMutation({
    mutationKey: ["create_data_absensi_tutor"],
    mutationFn: (data: {
      tutor_id: number;
      ekskul_id: number;
      tanggal: string;
      status: "Hadir" | "Alpha" | "Izin" | "Sakit";
      keterangan?: string;
    }) => createDataAbsensiTutor(data, token),
    onSuccess: () => {
      reset();
      stateHandle("post", true);
      query.invalidateQueries({ queryKey: ["get_data_absensi_tutor"] });
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
    reset, // <-- tambahin ini
  };
};

