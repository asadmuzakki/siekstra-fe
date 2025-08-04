import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCreateDataAbsensiTutor } from "../Hooks/Admin/usePost";
import { useGetDataTutorAdmin, useGetDataEkskulAdmin } from "../Hooks/Admin/useGet";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  setShow: (val: boolean) => void;
  setSuccessCreate: (val: boolean) => void;
  setErrorCreate: (val: boolean) => void;
  setSuccessUpdate: (val: boolean) => void;
  setErrorUpdate: (val: boolean) => void;
  isEdit?: boolean;
  idAbsensiTutor?: string;
};

const CardCreateDataAbsensiTutor: React.FC<Props> = ({
  setShow,
  setSuccessCreate,
  setErrorCreate,
  setSuccessUpdate,
  setErrorUpdate,
  isEdit,
  idAbsensiTutor,
}) => {
  const [tutorId, setTutorId] = useState<number | "">("");
  const [ekskulId, setEkskulId] = useState<number | "">("");
  const [status, setStatus] = useState<string>("");
  const [keterangan, setKeterangan] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>("");

  const { data: tutors } = useGetDataTutorAdmin();
  const { data: ekskuls } = useGetDataEkskulAdmin();

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    success,
    error,
    isLoading,
  } = useCreateDataAbsensiTutor();

  const handleFormSubmit = (data: {
    tutor_id: number;
    ekskul_id: number;
    tanggal: string;
    status: "Hadir" | "Alpha" | "Izin" | "Sakit";
    keterangan?: string;
  }) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (success) {
      setSuccessCreate(true);
      setShow(false);
    }
    if (error) {
      setErrorCreate(true);
      setShow(false);
    }
  }, [success, error]);

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
              {isEdit ? "Edit Absensi Tutor" : "Create Absensi Tutor"}
            </h2>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nama Tutor
                </label>
                <select
                  value={tutorId}
                  {...register("tutor_id", { required: true })}
                  onChange={(e) => setTutorId(Number(e.target.value))}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Tutor</option>
                  {tutors?.data.map((tutor: { id: number; name: string }) => (
                    <option key={tutor.id} value={tutor.id}>
                      {tutor.name}
                    </option>
                  ))}
                </select>
                {errors.tutor_id && (
                  <p className="text-red-500 text-xs mt-1">
                    Tutor wajib dipilih.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nama Ekskul
                </label>
                <select
                  value={ekskulId}
                  {...register("ekskul_id", { required: true })}
                  onChange={(e) => setEkskulId(Number(e.target.value))}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Ekskul</option>
                  {ekskuls?.data.map((ekskul: { id: number; nama_ekskul: string }) => (
                    <option key={ekskul.id} value={ekskul.id}>
                      {ekskul.nama_ekskul}
                    </option>
                  ))}
                </select>
                {errors.ekskul_id && (
                  <p className="text-red-500 text-xs mt-1">
                    Ekskul wajib dipilih.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <select
                  value={status}
                  {...register("status", { required: true })}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Status</option>
                  <option value="Hadir">Hadir</option>
                  <option value="Alpha">Alpha</option>
                  <option value="Izin">Izin</option>
                  <option value="Sakit">Sakit</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">
                    Status wajib dipilih.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Keterangan
                </label>
                <textarea
                  value={keterangan}
                  {...register("keterangan")}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Tanggal
                </label>
                <input
                  value={tanggal}
                  {...register("tanggal", { required: true })}
                  onChange={(e) => setTanggal(e.target.value)}
                  type="date"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.tanggal && (
                  <p className="text-red-500 text-xs mt-1">
                    Tanggal wajib diisi.
                  </p>
                )}
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
          </div>
        </div>
      )}
    </>
  );
};

export default CardCreateDataAbsensiTutor;
