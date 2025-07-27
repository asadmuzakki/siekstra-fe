import { AiOutlineClose } from "react-icons/ai";

import type { DataSiswaModelType } from "../Models/AdminModels";
import { useCreateDataSiswa } from "../Hooks/Admin/usePost";
import { useEffect, useState } from "react";
import { useGetDataSiswaAdminByAdmin } from "../Hooks/Admin/useGet";
import { useUpdateDataSiswa } from "../Hooks/Admin/usePatch";
import LoadingSpinner from "./LoadingSpinner";
type props = {
  setShow: (val: boolean) => void;
  setSuccessCreate: (val: boolean) => void;
  setErrorCreate: (val: boolean) => void;
  setSuccessUpdate: (val: boolean) => void;
  setErrorUpdate: (val: boolean) => void;
  isEdit?: boolean;
  idSiswa?: string;
};

const CardCreateDataSiswa: React.FC<props> = ({
  setShow,
  setSuccessCreate,
  setErrorCreate,
  setErrorUpdate,
  setSuccessUpdate,
  idSiswa,
  isEdit,
}) => {
  const [nis, setNis] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [kelas, setKelas] = useState<string>("");
  const [jenisKelamin, setJenisKelamin] = useState<string>("");
  const [namaOrtu, setNamaOrtu] = useState<string>("");
  const [emailOrtu, setEmailOrtu] = useState<string>("");

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    success,
    error,
    isLoading,
  } = useCreateDataSiswa();
  const { data } = useGetDataSiswaAdminByAdmin(idSiswa || "");
  const {
    setValue,
    handleSubmit_update,
    onSubmit_update,
    isSuccess_update,
    isError_update,
    isLoading_update,
  } = useUpdateDataSiswa(idSiswa || "");
  const handleFormSubmit = (data: DataSiswaModelType) => {
    onSubmit(data);
    console.log(data);
  };
  const handleFormUpdate = (data: DataSiswaModelType) => {
    onSubmit_update(data);
    console.log(data);
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      setNis(data.data.nis);
      setNama(data.data.nama);
      setKelas(data.data.kelas);
      setJenisKelamin(data.data.jenis_kelamin);
      setNamaOrtu(data.data.nama_ortu);
      setEmailOrtu(data.data.email_ortu);
    }

    if (!isEdit) {
      setNis("");
      setNama("");
      setKelas("");
      setJenisKelamin("");
      setNamaOrtu("");
      setEmailOrtu("");
    }

    if (success) {
      setSuccessCreate(true);
      setShow(false);
    }
    if (error) {
      setErrorCreate(true);
      setShow(false);
    }
    if (isSuccess_update) {
      setSuccessUpdate(true);
      setShow(false);
    }
    if (isError_update) {
      setErrorUpdate(true);
      setShow(false);
    }
  }, [success, error, data, isSuccess_update, isError_update]);
  return (
    <>
      {setShow && (
        <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100/80 z-50`}
        >
          <div className="relative max-w-md w-full mx-auto bg-white shadow-lg rounded-xl p-6">
            {/* Tombol Close */}
            <button
              onClick={() => {
                setShow(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {isEdit ? "Edit Data Siswa" : " Create Data Siswa"}
            </h2>
            <form
              onSubmit={
                isEdit
                  ? handleSubmit_update(handleFormUpdate)
                  : handleSubmit(handleFormSubmit)
              }
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nama Siswa
                </label>
                <input
                  value={nama}
                  {...(!isEdit && register("nama"))}
                  onChange={(e) => setNama(e.target.value)}
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.nama && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nama.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Jenis Kelamin
                </label>
                <select
                  value={jenisKelamin}
                  {...(!isEdit && register("jenis_kelamin"))}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jenis_kelamin && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.jenis_kelamin.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  NIS
                </label>
                <input
                  value={nis}
                  {...(!isEdit && register("nis"))}
                  onChange={(e) => setNis(e.target.value)}
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.nis && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nis.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Kelas
                </label>
                <input
                  value={kelas}
                  {...(!isEdit && register("kelas"))}
                  onChange={(e) => setKelas(e.target.value)}
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.kelas && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.kelas.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nama Orang Tua
                </label>
                <input
                  value={namaOrtu}
                  {...(!isEdit && register("nama_ortu"))}
                  onChange={(e) => setNamaOrtu(e.target.value)}
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.nama_ortu && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nama_ortu.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email Orang Tua
                </label>
                <input
                  value={emailOrtu}
                  {...(!isEdit && register("email_ortu"))}
                  onChange={(e) => setEmailOrtu(e.target.value)}
                  type="email"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email_ortu && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email_ortu.message}
                  </p>
                )}
              </div>
              <div className="w-full flex justify-center items-center mt-5">
                <button
                  type="submit"
                  onClick={() => {
                    if (isEdit) {
                      setValue("nis", nis);
                      setValue("nama", nama);
                      setValue("email_ortu", emailOrtu);
                      setValue("kelas", kelas);
                      setValue("nama_ortu", namaOrtu);
                      setValue("jenis_kelamin", jenisKelamin);
                    }
                  }}
                  className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                >
                  <p>Simpan Data</p>
                  {isLoading && <LoadingSpinner />}
                  {isLoading_update && <LoadingSpinner />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CardCreateDataSiswa;
