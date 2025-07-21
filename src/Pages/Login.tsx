import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import type { LoginModelsType } from "../Models/AuthModels";
import { LuLoader } from "react-icons/lu";
import Popup from "../Components/Popup";
import * as Auth from "../Hooks/useAuth";
import { useGlobalContext } from "../Context/Context";

const Login = () => {
  const { state } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const {
    error,
    error_message,
    errors,
    handleSubmit,
    isLoading,
    onSubmit,
    register,
    succes_message,
    success,
  } = Auth.useLogin();
  const handleLogin = (data: LoginModelsType) => {
    onSubmit(data);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      {success && (
        <Popup
          label="Login Berhasil"
          message={succes_message}
          navigateTo=""
          isSuccess={true}
          stateConcition={state.showPopup}
          stateName="showPopup"
        />
      )}
      {error && (
        <Popup
          label="Login Gagal"
          message={error_message}
          navigateTo=""
          isSuccess={false}
          stateConcition={state.showPopup}
          stateName="showPopup"
        />
      )}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col items-center p-8 sm:p-12">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrb7jv0MhppoJfDAyM8m_IUOVH4Cep3dPUTHNMhOMA3g&s&ec=72940543"
          alt="Logo"
          className="w-28 mb-6"
        />

        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Selamat Datang
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Silakan login untuk melanjutkan
        </p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full mt-10 space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiUser />
              </span>
              <input
                {...register("email")}
                type="text"
                placeholder="Masukkan username"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.email && (
              <p className=" text-sm p-1 text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiLock />
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className=" text-sm p-1 text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer "
          >
            <div className="flex justify-center gap-1 items-center">
              <p className="text-base">Login</p>
              {isLoading && <LuLoader className="text-lg animate-spin" />}
            </div>
          </button>
        </form>
        <p className="mt-2 w-full text-end text-sm">
          Belum Memiliki Akun ?{" "}
          <span className="underline text-blue-600 cursor-pointer">
            Sign up
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
