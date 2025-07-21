import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginModels,
  RegisterModel,
  type LoginModelsType,
  type RegisterModelType,
} from "../Models/AuthModels";
import { axiosInstance } from "../lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useGlobalContext } from "../Context/Context";

const login = async (data: LoginModelsType) => {
  const response = await axiosInstance.post("/api/login", data);
  return response.data;
};
export const useLogin = () => {
  const { stateHandle } = useGlobalContext();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModelsType>({
    resolver: zodResolver(LoginModels),
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginModelsType) => login(data),
    onSuccess: () => {
      stateHandle("showPopup", true);
      reset();
    },
    onError: () => {
      stateHandle("showPopup", true);
    },
  });
  return {
    register,
    handleSubmit,
    errors,
    isLoading: mutation.isPending,
    onSubmit: mutation.mutate,
    success: mutation.isSuccess,
    error: mutation.isError,
    succes_message: "Login Berhasil!!!",
    error_message: "Login Gagal!!!",
  };
};

const registration = async (data: RegisterModelType) => {
  const response = await axiosInstance.post("/api/register", data);
  return response.data;
};

export const useRegistration = () => {
  const { stateHandle } = useGlobalContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterModelType>({
    resolver: zodResolver(RegisterModel),
  });

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterModelType) => registration(data),
    onSuccess: () => {
      stateHandle("showPopup", true);
      reset();
    },
    onError: () => {
      stateHandle("showPopup", true);
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
