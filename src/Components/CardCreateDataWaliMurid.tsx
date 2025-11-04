import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCreateDataWaliMurid } from "../Hooks/Admin/usePost";
import { useUpdateDataWaliMurid } from "../Hooks/Admin/usePatch";
import LoadingSpinner from "./LoadingSpinner";
import { useGetDataWaliById } from "../Hooks/Admin/useGet";
import type { DataWaliMuridModelType } from "../Models/AdminModels";

type Props = {
  setShow: (val: boolean) => void;
  setSuccessCreate: (val: boolean) => void;
  setErrorCreate: (val: boolean) => void;
  setSuccessUpdate: (val: boolean) => void;
  setErrorUpdate: (val: boolean) => void;
  isEdit?: boolean; // Menambahkan properti isEdit
  idSiswa?: string;
};

const CardCreateDataWaliMurid: React.FC<Props> = ({
  setShow,
  setSuccessCreate,
  setErrorCreate,
  setErrorUpdate,
  setSuccessUpdate,
  idSiswa,
  isEdit,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    success,
    error,
    isLoading,
  } = useCreateDataWaliMurid();

  const {
    onSubmit_update,
    isSuccess_update,
    isError_update,
    isLoading_update,
  } = useUpdateDataWaliMurid(idSiswa || "");

  const { data: dataWali } = useGetDataWaliById(idSiswa || "");

  const handleFormSubmit = (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    onSubmit({ ...data, password_confirmation: passwordConfirmation });
    console.log({ ...data, password_confirmation: passwordConfirmation });
  };

  useEffect(() => {
    if (dataWali?.user) {
      const { name, email, password, password_confirmation } = dataWali.user;
      if (name) setName(name);
      if (email) setEmail(email);
      if (password) setPassword(password);
      if (password_confirmation) setPasswordConfirmation(password_confirmation);
    }
    if (success) {
      setSuccessCreate(true);
      setShow(false);
      return;
    } else if (error) {
      setErrorCreate(true);
      setShow(false);
      return;
    }

    if (isSuccess_update) {
      setSuccessUpdate(true);
      setShow(false);
      return;
    } else if (isError_update) {
      setErrorUpdate(true);
      setShow(false);
      return;
    }
  }, [success, error, isSuccess_update, isError_update, setShow, dataWali]);

  const handleFormUpdate = (data: DataWaliMuridModelType) => {
    onSubmit_update(data);
    console.log(data);
  };

  return (
    <>
      {setShow && (
        <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100/80 z-50`}
        >
          <div className="relative max-w-md w-full mx-auto bg-white shadow-lg rounded-xl p-6">
            {/* Close Button */}
            <button
              onClick={() => {
                setShow(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {isEdit ? "Edit Data Wali Murid" : "Create Data Wali Murid"}
            </h2>
            {!isEdit && (
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Nama
                  </label>
                  <input
                    defaultValue={dataWali?.user?.name}
                    {...register("name")}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    defaultValue={dataWali?.user?.email}
                    {...register("email")}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <input
                    value={password}
                    {...register("password")}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Konfirmasi Password
                  </label>
                  <input
                    value={passwordConfirmation}
                    {...register("password_confirmation")}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type="password"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="w-full flex justify-center items-center mt-5">
                  <button
                    type="submit"
                    className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                  >
                    <p>{isEdit ? "Update Data" : "Simpan Data"}</p>
                    {isLoading && <LoadingSpinner />}
                  </button>
                </div>
              </form>
            )}
            {isEdit && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Nama
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Konfirmasi Password
                  </label>
                  <input
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type="password"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="w-full flex justify-center items-center mt-5">
                  <button
                    onClick={() => {
                      if (isEdit) {
                        const dataSending = {
                          name,
                          email,
                          password,
                          password_confirmation: passwordConfirmation,
                        };
                        handleFormUpdate(dataSending);
                      }
                    }}
                    type="button"
                    disabled = {password === "" || passwordConfirmation === ""}
                    className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                  >
                    <p>{isEdit ? "Update Data" : "Simpan Data"}</p>
                    {isLoading_update && <LoadingSpinner />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardCreateDataWaliMurid;
