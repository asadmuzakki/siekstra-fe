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
import { useCookies } from "react-cookie";

const login = async (data: LoginModelsType) => {
  const response = await axiosInstance.post("/api/login", data);
  return response.data;
};
export const useLogin = () => {
  const { stateHandle } = useGlobalContext();
  const [, setCookie] = useCookies(["authToken", "role", "user_id"]);
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
    onSuccess: (data) => {
      console.log(data);
      setCookie("authToken", data.access_token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      setCookie("role", data.role[0]);
      setCookie("user_id", data.user_id);
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

const logoutRequest = async (token: string) => {
  const res = await axiosInstance.post(
    "/api/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const useLogout = () => {
  const { stateHandle } = useGlobalContext();
  const [cookies, , removeCookie] = useCookies(["authToken", "role", "user_id"]);

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logoutRequest(cookies.authToken),
    onSuccess: () => {
      // hapus cookies
      removeCookie("authToken", { path: "/" });
      removeCookie("role", { path: "/" });
      removeCookie("user_id", { path: "/" });

      // munculkan popup sukses
      stateHandle("showPopup", true);
    },
    onError: () => {
      // popup gagal
      stateHandle("showPopup", true);
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.isError,
    succes_message: "Logout berhasil!",
    error_message: "Logout gagal!",
  };
};

