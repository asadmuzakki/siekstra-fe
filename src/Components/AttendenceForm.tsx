import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/Context";
import * as Post from "../Hooks/usePost";
import * as Get from "../Hooks/useGet";
import * as Patch from "../Hooks/usePatch";
import type { AbsenTutorModelType } from "../Models/ekskul.model";
import LoadingSpinner from "./LoadingSpinner";

type AttendanceFormProps = {
  tutor_id?: string;
  update: boolean;
  success?: (val: boolean) => void;
  error?: (val: boolean) => void;
  id_absen?: string;
  handleClose?: () => void;
};

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  tutor_id,
  update,
  error,
  success,
  id_absen,
  handleClose,
}) => {
  const { state, stateHandle } = useGlobalContext();
  const { data: data_absensi, isLoading: isLoading_absensi } =
    Get.useGetAbsensiByTutor(id_absen ?? "");
  const { data } = Get.useGetEkskul();
  const {
    onSubmit,
    isLoading,
    success: success_post,
    error: error_post,
  } = Post.usePostAbsenTutor();
  const {
    onSubmit: onSubmit_update,
    isLoading: isLoading_update,
    error: error_update,
    success: success_update,
  } = Patch.useUpdateAbsenTutor(id_absen ?? "");

  const getTodayDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [kelasId, setKelasId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Alpha");
  const [selectedEkskul, setSelectedEkskul] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");
  const [notes, setNotes] = useState("");
  const [isEkskulOpen, setIsEkskulOpen] = useState(false);
  const [ekskul_id, setEkskul_id] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>(getTodayDate());
  const [kelasOpen, setKelasOpen] = useState(false);

  const { data_kelas } = Get.useDataKelas(ekskul_id);

  const handleSubmitAbsensi = () => {
    const payload = {
      kelas_ekskul_id: Number(kelasId),
      tutor_id: Number(tutor_id),
      status: selectedStatus as "Hadir" | "Izin" | "Sakit" | "Alpha",
      tanggal,
      keterangan: notes,
    };
    onSubmit(payload);
  };

  const handleUpdateAbsensi = () => {
    const payload = {
      kelas_ekskul_id: Number(kelasId),
      tutor_id: Number(tutor_id),
      status: selectedStatus as "Hadir" | "Izin" | "Sakit" | "Alpha",
      tanggal,
      keterangan: notes,
    };
    onSubmit_update(payload);
  };

  useEffect(() => {
    // Saat mode update dan data_absensi tersedia
    if (update && data_absensi?.data) {
      // Hanya set default jika form belum pernah ditekan user
      if (!selectedEkskul) {
        setSelectedStatus(data_absensi.data.status);
        setEkskul_id(String(data_absensi.data.ekskul_id));
        setSelectedEkskul(data_absensi.data.kelas_ekskul.ekskul.nama_ekskul);
        setNotes(data_absensi.data.keterangan);
        setTanggal(data_absensi.data.tanggal);
      }
    }
    // Saat absensi berhasil disubmit
    if (success_post && success) {
      success(true);
      stateHandle("showPopAbsen", false);
      handleClose?.();
    }
    if (success_update && success) {
      success(true);
      stateHandle("showPopAbsen", false);
      handleClose?.();
    }

    // Saat absensi gagal disubmit
    if (error_post && error) {
      error(true);
      stateHandle("showPopAbsen", false);
      handleClose?.();
    }

    if (error_update && error) {
      error(true);
      stateHandle("showPopAbsen", false);
      handleClose?.();
    }

    console.log(data_kelas);
  }, [
    update,
    data_absensi,
    success_post,
    error_post,
    error_update,
    success_update,
    data_kelas,
  ]);

  return (
    <div
      onClick={() => {
        stateHandle("showPopAbsen", false);
        handleClose?.();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ${
        state.showPopAbsen ? "" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md p-4 h-fit"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (update) {
              handleUpdateAbsensi();
            } else {
              handleSubmitAbsensi();
            }
          }}
          className={`bg-white rounded-lg shadow-xl ${
            isLoading_absensi ? "h-70" : ""
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium text-gray-700">
              {update ? "Edit Absensi" : "Tambah Absensi"}
            </h2>
            <button
              onClick={() => {
                stateHandle("showPopAbsen", false);
                handleClose?.();
              }}
              type="button"
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          {isLoading_absensi ? (
            <div className=" flex items-center justify-center h-full bg-white rounded-b-lg">
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          ) : (
            <div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {["Hadir", "Sakit", "Izin", "Alpha"].map((status) => (
                    <label key={status} className="cursor-pointer text-center">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={() => setSelectedStatus(status)}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedStatus === status
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedStatus === status && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            selectedStatus === status
                              ? "text-green-600 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ekstrakurikuler
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsEkskulOpen(!isEkskulOpen)}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left flex justify-between"
                    >
                      <span
                        className={
                          selectedEkskul ? "text-gray-900" : "text-gray-500"
                        }
                      >
                        {selectedEkskul || "Pilih Ekstrakurikuler"}
                      </span>
                      <span
                        className={`text-gray-400 ${
                          isEkskulOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {isEkskulOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {data?.data.map((ekskul, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setEkskul_id(String(ekskul.id));
                              setSelectedEkskul(ekskul.nama_ekskul);
                              setIsEkskulOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50"
                          >
                            {ekskul.nama_ekskul}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Kelas
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setKelasOpen(!kelasOpen)}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left flex justify-between"
                    >
                      <span
                        className={
                          selectedKelas ? "text-gray-900" : "text-gray-500"
                        }
                      >
                        {selectedKelas || "Pilih Ekstrakurikuler"}
                      </span>
                      <span
                        className={`text-gray-400 ${
                          kelasOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {kelasOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {data_kelas?.data?.map((kelas: any, index: number) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setKelasId(String(kelas.id));
                              setSelectedKelas(kelas.nama_kelas);
                              setKelasOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50"
                          >
                            {kelas.nama_kelas}
                          </button>
                        ))}
                      </div>
                    )}
                    {kelasOpen && update && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {data_kelas?.data?.map((kelas: any, index: number) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setKelasId(String(kelas.id));
                              setSelectedKelas(kelas.nama_kelas);
                              setKelasOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50"
                          >
                            {kelas?.nama_kelas}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    disabled={!update}
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Keterangan
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Kegiatan Hari Ini"
                    className="w-full px-3 py-2 border rounded-md resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 p-4 border-t bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => {
                    stateHandle("showPopAbsen", false);
                    handleClose?.();
                  }}
                  type="button"
                  className="px-4 py-2 text-sm bg-white border rounded-md"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center justify-center gap-1"
                >
                  <p>{update ? "Update" : "Tambah"}</p>
                  {isLoading_update && <LoadingSpinner />}
                  {isLoading && <LoadingSpinner />}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AttendanceForm;
