/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCreateDataKelasEkskul } from "../Hooks/Admin/usePost";
import { useGetKelasEkskulById } from "../Hooks/Admin/useGet";
import { useUpdateDataKelasEkskul } from "../Hooks/Admin/usePatch";
import { useGetDataEkskulAdmin } from "../Hooks/Admin/useGet";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  setShow: (val: boolean) => void;
  setSuccessCreate: (val: boolean) => void;
  setErrorCreate: (val: boolean) => void;
  setSuccessUpdate: (val: boolean) => void;
  setErrorUpdate: (val: boolean) => void;
  isEdit?: boolean;
  idKelas?: string;
};

const CardCreateDataKelasEkskul: React.FC<Props> = ({
  setShow,
  setSuccessCreate,
  setErrorCreate,
  setSuccessUpdate,
  setErrorUpdate,
  isEdit,
  idKelas,
}) => {
  // === LOCAL STATE ===
  const [ekskulId, setEkskulId] = useState<number>(0);
  const [namaKelas, setNamaKelas] = useState("");
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [periode, setPeriode] = useState("");
  const [status, setStatus] = useState("");

  // === HOOKS ===
  const { onSubmit, success, error, isLoading } =
    useCreateDataKelasEkskul();

  const { data } = useGetKelasEkskulById(idKelas || "");

  const {
    onSubmit_update,
    isLoading_update,
    isSuccess_update,
    isError_update,
  } = useUpdateDataKelasEkskul(idKelas || "");

  const { data: ekskulList } = useGetDataEkskulAdmin();
  console.log("list ekskul : ",ekskulList)

  // === CREATE HANDLER ===
  const handleFormSubmit = () => {
    onSubmit({
      ekskul_id: ekskulId,
      nama_kelas: namaKelas,
      tahun_ajaran: tahunAjaran,
      periode,
      status,
    });
  };

  // === UPDATE HANDLER ===
  const handleFormUpdate = () => {
    onSubmit_update({
      ekskul_id: ekskulId,
      nama_kelas: namaKelas,
      tahun_ajaran: tahunAjaran,
      periode,
      status,
    });
  };

  // === AUTO-FILL SAAT EDIT ===
  useEffect(() => {
    if (data && isEdit) {
      setEkskulId(Number(data.data.ekskul_id));
      setNamaKelas(data.data.nama_kelas || "");
      setTahunAjaran(data.data.tahun_ajaran || "");
      setPeriode(data.data.periode || "");
      setStatus(data.data.status || "");
    }

    if (!isEdit) {
      setEkskulId(0);
      setNamaKelas("");
      setTahunAjaran("");
      setPeriode("");
      setStatus("");
    }

    // === FEEDBACK HANDLING ===
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
  }, [
    data,
    isEdit,
    success,
    error,
    isSuccess_update,
    isError_update,
    setShow,
    setErrorCreate,
    setSuccessCreate,
    setErrorUpdate,
    setSuccessUpdate,
  ]);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100/80 z-50">
        <div className="relative max-w-md w-full mx-auto bg-white shadow-lg rounded-xl p-6">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
          >
            <AiOutlineClose size={20} />
          </button>

          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {isEdit ? "Edit Kelas Ekskul" : "Tambah Kelas Ekskul"}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEdit ? handleFormUpdate() : handleFormSubmit();
            }}
            className="space-y-4"
          >
            {/* Ekskul */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Ekskul
              </label>
              <select
                value={ekskulId}
                onChange={(e) => setEkskulId(Number(e.target.value))}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              >
                <option value={0}>Pilih Ekskul</option>
                {ekskulList?.data?.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.nama_ekskul}
                  </option>
                ))}
              </select>
            </div>

            {/* Nama Kelas */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Nama Kelas
              </label>
              <input
                value={namaKelas}
                onChange={(e) => setNamaKelas(e.target.value)}
                type="text"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Tahun Ajaran */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Tahun Ajaran
              </label>
              <input
                value={tahunAjaran}
                onChange={(e) => setTahunAjaran(e.target.value)}
                type="text"
                placeholder="contoh: 2025/2026"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Periode */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Periode
              </label>
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              >
                <option value="">Pilih Periode</option>
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              >
                <option value="">Pilih Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="w-full flex justify-center items-center mt-5">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
              >
                Simpan Data
                {(isLoading || isLoading_update) && <LoadingSpinner />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CardCreateDataKelasEkskul;
