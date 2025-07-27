import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axiosInstance";
import {
  DataSiswaModel,
  type DataSiswaModelType,
} from "../../Models/AdminModels";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "../../Context/Context";

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
