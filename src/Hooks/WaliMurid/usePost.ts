import { useCookies } from "react-cookie";
import { axiosInstance } from "../../lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../Context/Context";

type PendaftaranEkskulType = {
  ekskul_id: number;   // id ekskul yang dipilih
  siswa_id: number;    // id siswa (wali murid mendaftarkan anaknya)
};

const createPendaftaranEkskul = async (
  data: { siswa_id: number; ekskul_id: number },
  token: string
) => {
  console.log("📦 Payload Daftar Ekskul:", data); // debug
  const response = await axiosInstance.post("/api/wali_murid/pendaftaran", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const useCreatePendaftaranEkskul = () => {
  const [cookies] = useCookies(["authToken"]);
  const { stateHandle } = useGlobalContext();
  const token = cookies.authToken;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PendaftaranEkskulType>();

  const mutation = useMutation({
    mutationKey: ["create_pendaftaran_ekskul"],
    mutationFn: (data: PendaftaranEkskulType) =>
      createPendaftaranEkskul(data, token),
    onSuccess: () => {
      reset();
      stateHandle("post", true);
      // invalidate agar daftar pendaftaran / ekskul refresh otomatis
      queryClient.invalidateQueries({ queryKey: ["get_pendaftaran_ekskul"] });
    },
    onError: (err) => {
      console.error("❌ Gagal daftar ekskul:", err);
      stateHandle("post", true);
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    onSubmit: mutation.mutate, // panggil ini di form
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
  };
};
