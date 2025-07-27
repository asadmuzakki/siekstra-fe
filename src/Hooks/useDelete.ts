import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import { useGlobalContext } from "../Context/Context";
import { useCookies } from "react-cookie";

const deleteAbsensi = async (id: string, token:string) => {
  const response = await axiosInstance.delete(`/api/tutor/absensi/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useDeleteAbsensi = () => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { stateHandle } = useGlobalContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAbsensi(id, token),
    mutationKey: ["delete_absensi"],
    onSuccess: () => {
      stateHandle("delete", true);
      queryClient.invalidateQueries({ queryKey: ["get_riwayat_absensi"] });
    },
    onError: () => {
      stateHandle("delete", true);
    },
  });
  return {
    onDelete: mutation.mutate,
    isLoadng: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
    success_message: "Delete Berhasil",
    error_message: "Delete Gagal",
  };
};

const deleteAbsensiKegiatan = async (id: string, token:string) => {
  const response = await axiosInstance.delete(`/api/tutor/kegiatan/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useDeleteAbsensiKegiatan = () => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { stateHandle } = useGlobalContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAbsensiKegiatan(id, token),
    mutationKey: ["delete_absensi_kegiatan"],
    onSuccess: () => {
      stateHandle("delete", true);
      queryClient.invalidateQueries({
        queryKey: ["get_riwayat_kegiatan"],
      });
    },
    onError: () => {
      stateHandle("delete", true);
    },
  });

  return {
    onDelete: mutation.mutate,
    isLoadng: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
    success_message: "Delete Berhasil",
    error_message: "Delete Gagal",
  };
};

const deleteAbsen = async (id: string, token:string) => {
  const response = await axiosInstance.delete(`/api/tutor/absensi-tutor/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useDeleteAbsenTutor = () => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { stateHandle } = useGlobalContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAbsen(id, token),
    mutationKey: ["delete_absensi_tutor"],
    onSuccess: () => {
      stateHandle("delete", true);
      queryClient.invalidateQueries({
        queryKey: ["get_absensi_tutor"],
      });
    },
    onError: () => {
      stateHandle("delete", true);
    },
  });
  return {
    onDelete: mutation.mutate,
    isLoadng: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
    success_message: "Delete Berhasil",
    error_message: "Delete Gagal",
  };
};
const deleteNilaiSiswaBytutor = async (id: string, token:string) => {
  const response = await axiosInstance.delete(`/api/tutor/nilais/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useDeleteNilaiSiswaBytutor = () => {
   const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken
  const { stateHandle } = useGlobalContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteNilaiSiswaBytutor(id, token),
    mutationKey: ["delete_absensi_tutor"],
    onSuccess: () => {
      stateHandle("delete", true);
      queryClient.invalidateQueries({
        queryKey: ["get_nilai_siswa_tutor"],
      });
    },
    onError: (err) => {
      console.log(err);
      
      stateHandle("delete", true);
    },
  });
  return {
    onDelete: mutation.mutate,
    isLoadng: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
    success_message: "Delete Berhasil",
    error_message: "Delete Gagal",
  };
};
