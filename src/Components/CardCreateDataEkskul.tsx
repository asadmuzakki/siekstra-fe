import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCreateDataEkskul } from "../Hooks/Admin/usePost";
import { useGetDataEkskulById } from "../Hooks/Admin/useGet";
import { useUpdateDataEkskul } from "../Hooks/Admin/usePatch";
import { useGetDataTutorAdmin } from "../Hooks/Admin/useGet";
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
  // local state utk form
  const [namaEkskul, setNamaEkskul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [tempat, setTempat] = useState("");
  const [tutorId, setTutorId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [kelasMin, setKelasMin] = useState<number>(1);
  const [kelasMax, setKelasMax] = useState<number>(6);
  const [foto, setFoto] = useState<File | null>(null);

  // hooks create / update
  const { onSubmit, success, error, isLoading } = useCreateDataEkskul();
  const { data } = useGetDataEkskulById(idEkskul || "");
  const {
    onSubmit_update,
    isSuccess_update,
    isError_update,
    isLoading_update,
  } = useUpdateDataEkskul(idEkskul || "");
  const { data: tutorData } = useGetDataTutorAdmin();

  // submit create
  const handleFormSubmit = () => {
    onSubmit({
      namaEkskul,
      deskripsi,
      jadwal,
      tempat,
      tutorId,
      status,
      kelasMin,
      kelasMax,
      foto,
    });
  };

  // submit update
  const handleFormUpdate = () => {
    onSubmit_update({
      namaEkskul,
      deskripsi,
      jadwal,
      tempat,
      tutorId,
      status,
      kelasMin,
      kelasMax,
      foto,
    });
  };

  // isi data saat edit
  useEffect(() => {
    if (data && isEdit) {
      setNamaEkskul(data.data.nama_ekskul || "");
      setDeskripsi(data.data.deskripsi || "");
      setJadwal(data.data.jadwal || "");
      setTempat(data.data.tempat || "");
      setTutorId(Number(data.data.tutor_id) || 0);
      setStatus(data.data.status || "");
      setKelasMin(data.data.kelas_min || 1);
      setKelasMax(data.data.kelas_max || 6);
    }

    if (!isEdit) {
      setNamaEkskul("");
      setDeskripsi("");
      setJadwal("");
      setTempat("");
      setTutorId(0);
      setStatus("");
      setKelasMin(1);
      setKelasMax(6);
      setFoto(null);
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
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100/80 z-50">
          <div className="relative max-w-md w-full mx-auto bg-white shadow-lg rounded-xl p-6">
            {/* Tombol Close */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {isEdit ? "Edit Data Ekstrakurikuler" : "Create Data Ekstrakurikuler"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isEdit) {
                  handleFormUpdate();
                } else {
                  handleFormSubmit();
                }
              }}
              className="space-y-4"
            >
              {/* Nama Ekskul */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nama Ekstrakurikuler
                </label>
                <input
                  value={namaEkskul}
                  onChange={(e) => setNamaEkskul(e.target.value)}
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Deskripsi
                </label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Jadwal */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Jadwal
                </label>
                <input
                  value={jadwal}
                  onChange={(e) => setJadwal(e.target.value)}
                  type="date"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tempat */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Tempat
                </label>
                <input
                  value={tempat}
                  onChange={(e) => setTempat(e.target.value)}
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tutor Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Tutor
                </label>
                <select
                  value={tutorId}
                  onChange={(e) => setTutorId(Number(e.target.value))}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Pilih Tutor</option>
                  {tutorData?.data?.map((tutor: any) => (
                    <option key={tutor.id} value={tutor.id}>
                      {tutor.name}
                    </option>
                  ))}
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
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Tidak Aktif</option>
                </select>
              </div>

              {/* Kelas Min & Max */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-600">
                    Kelas Min
                  </label>
                  <input
                    value={kelasMin}
                    onChange={(e) => setKelasMin(Number(e.target.value))}
                    type="number"
                    min={1}
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-600">
                    Kelas Max
                  </label>
                  <input
                    value={kelasMax}
                    onChange={(e) => setKelasMax(Number(e.target.value))}
                    type="number"
                    min={1}
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Upload Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Upload Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFoto(e.target.files[0]);
                    }
                  }}
                  className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
                />
              </div>

              {/* Submit */}
              <div className="w-full flex justify-center items-center mt-5">
                <button
                  type="submit"
                  className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                >
                  <p>Simpan Data</p>
                  {(isLoading || isLoading_update) && <LoadingSpinner />}
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
