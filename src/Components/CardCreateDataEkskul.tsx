import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCreateDataEkskul } from "../Hooks/Admin/usePost";
import { useGetDataEkskulById } from "../Hooks/Admin/useGet";
import { useUpdateDataEkskul } from "../Hooks/Admin/usePatch";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  setShow: (val: boolean) => void;
  setSuccessCreate: (val: boolean) => void;
  setErrorCreate: (val: boolean) => void;
  setSuccessUpdate: (val: boolean) => void;
  setErrorUpdate: (val: boolean) => void;
  isEdit?: boolean;
  idEkskul?: string;
};

const CardCreateDataEkskul: React.FC<Props> = ({
  setShow,
  setSuccessCreate,
  setErrorCreate,
  setErrorUpdate,
  setSuccessUpdate,
  idEkskul,
  isEdit,
}) => {
  const [namaEkskul, setNamaEkskul] = useState<string>("");
  const [namaTutor, setNamaTutor] = useState<string>("");
  const [jumlahSiswa, setJumlahSiswa] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>("");

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    success,
    error,
    isLoading,
  } = useCreateDataEkskul();

  const { data } = useGetDataEkskulById(idEkskul || "");
  const {
    setValue,
    handleSubmit_update,
    onSubmit_update,
    isSuccess_update,
    isError_update,
    isLoading_update,
  } = useUpdateDataEkskul(idEkskul || "");

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    console.log(data);
  };

  const handleFormUpdate = (data: any) => {
    onSubmit_update(data);
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      setNamaEkskul(data.data.namaEkskul);
      setNamaTutor(data.data.namaTutor);
      setJumlahSiswa(data.data.jumlahSiswa);
      setStatus(data.data.status);
      setTanggal(data.data.tanggal);
    }

    if (!isEdit) {
      setNamaEkskul("");
      setNamaTutor("");
      setJumlahSiswa(0);
      setStatus("");
      setTanggal("");
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
              {isEdit ? "Edit Data Ekstrakurikuler" : "Create Data Ekstrakurikuler"}
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
                  Nama Ekstrakurikuler
                </label>
                <input
                  value={namaEkskul}
                  {...(!isEdit && register("namaEkskul"))}
                  onChange={(e) => setNamaEkskul(e.target.value)}
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.namaEkskul && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.namaEkskul.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nama Tutor
                </label>
                <input
                  value={namaTutor}
                  {...(!isEdit && register("namaTutor"))}
                  onChange={(e) => setNamaTutor(e.target.value)}
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.namaTutor && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.namaTutor.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Jumlah Siswa
                </label>
                <input
                  value={jumlahSiswa}
                  {...(!isEdit && register("jumlahSiswa"))}
                  onChange={(e) => setJumlahSiswa(Number(e.target.value))}
                  type="number"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.jumlahSiswa && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.jumlahSiswa.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <select
                  value={status}
                  {...(!isEdit && register("status"))}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Tanggal
                </label>
                <input
                  value={tanggal}
                  {...(!isEdit && register("tanggal"))}
                  onChange={(e) => setTanggal(e.target.value)}
                  type="date"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.tanggal && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tanggal.message}
                  </p>
                )}
              </div>

              <div className="w-full flex justify-center items-center mt-5">
                <button
                  type="submit"
                  onClick={() => {
                    if (isEdit) {
                      setValue("namaEkskul", namaEkskul);
                      setValue("namaTutor", namaTutor);
                      setValue("jumlahSiswa", jumlahSiswa);
                      setValue("status", status);
                      setValue("tanggal", tanggal);
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

export default CardCreateDataEkskul;