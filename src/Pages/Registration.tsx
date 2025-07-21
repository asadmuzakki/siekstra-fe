import {  useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import * as Auth from "../Hooks/useAuth";
import type { RegisterModelType } from "../Models/AuthModels";
import { LuLoader } from "react-icons/lu";
import { useGlobalContext } from "../Context/Context";
import Popup from "../Components/Popup";
const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, handleSubmit, errors, onSubmit, isLoading, success, error } = Auth.useRegistration();
const {state} = useGlobalContext()

  const handleRegister = (data: RegisterModelType) => {
    console.log(data);

    onSubmit(data);
  };



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-4">
       {success && (
        <Popup
          label="Registrasi Berhasil"
          message='Registrasi Berhasil'
          navigateTo=""
          isSuccess={true}
          stateConcition={state.showPopup}
          stateName="showPopup"
        />
      )}
      {error && (
        <Popup
          label="Registrasi Gagal"
          message='Registrasi Gagal'
          navigateTo=""
          isSuccess={false}
          stateConcition={state.showPopup}
          stateName="showPopup"
        />
      )}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col items-center p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Daftar Akun
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Silakan isi form untuk mendaftar
        </p>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="w-full mt-10 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nama</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiUser />
              </span>
              <input
                {...register("name")}
                type="text"
                placeholder="Masukkan nama"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.name && (
              <p className="text-sm p-1 text-red-600">{errors.name.message}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiMail />
              </span>
              <input
                {...register("email")}
                type="email"
                placeholder="Masukkan email"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.email && (
              <p className="text-sm p-1 text-red-600">{errors.email.message}</p>
            )}
          </div>
          {/* Password */}
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
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm p-1 text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
  
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Konfirmasi Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiLock />
              </span>
              <input
                {...register("password_confirmation")}
                type={showConfirm ? "text" : "password"}
                placeholder="Ulangi password"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-sm p-1 text-red-600">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer "
          >
            <div className="flex justify-center gap-1 items-center">

            <p className="text-base">Daftar</p>
            {isLoading &&(

            <LuLoader className="text-lg animate-spin" />
            )}
            </div>

          </button>
        </form>

        <p className="mt-2 w-full text-end text-sm">
          Sudah punya akun?{" "}
          <span className="underline text-blue-600 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
