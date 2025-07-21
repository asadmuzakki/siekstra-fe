import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import { useGlobalContext } from "../Context/Context";

const deleteAbsensi = async (id: string) => {
  const response = await axiosInstance.delete(`/api/absensi/${id}`);
  return response.data;
};

export const useDeleteAbsensi = () => {
  const { stateHandle } = useGlobalContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAbsensi(id),
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

const deleteAbsensiKegiatan = async (id: string) => {
  const response = await axiosInstance.delete(`/api/kegiatan/${id}`);
  return response.data;
};

export const useDeleteAbsensiKegiatan = () => {
  const { stateHandle } = useGlobalContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAbsensiKegiatan(id),
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

const deleteAbsen = async (id: string) => {
  const response = await axiosInstance.delete(`/api/absensi-tutor/${id}`);
  return response.data;
};

export const useDeleteAbsenTutor = () => {
  const { stateHandle } = useGlobalContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAbsen(id),
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
