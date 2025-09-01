/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

import type { FormModelType } from "../../Models/ekskul.model";

import { useParams } from "react-router-dom";
import * as Get from "../../Hooks/useGet";
import * as Post from "../../Hooks/usePost";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Popup from "../../Components/Popup";
import { useGlobalContext } from "../../Context/Context";

interface AbsensiEntry {
  id: number;
  nama: string;
  hadir: boolean;
  sakit: boolean;
  izin: boolean;
  alpa: boolean;
  keterangan: string;
}

const AbsensiEkskul = () => {
  const { id } = useParams();
  const [entries, setEntries] = useState<AbsensiEntry[]>([]);
  const { data: ekskul_name } = Get.useGetEkskulById(String(id));

  const { state } = useGlobalContext();
  const {
    handleSubmit,
    register,
    onSubmit,
    fields,
    setValue,
    isLoading: isLoading_absensi,
    success,
    error,
    success_message,
    error_message,
  } = Post.useAbsensiKegiatan();
  const { data: data_siswa, isLoading } = Get.useGetSiswa1(String(id));

  useEffect(() => {
    console.log(data_siswa?.data);
    if (data_siswa && data_siswa.data.length > 0) {
      // Initialize entries for UI display
      const initialEntries: AbsensiEntry[] = data_siswa?.data?.map(
        (s: any, index: number) => ({
          id: s.siswa.id || index,
          nama: s.siswa.nama || `Siswa ${index + 1}`,
          hadir: false,
          sakit: false,
          izin: false,
          alpa: true, // Default to Alpha
          keterangan: "",
        })
      );

      setEntries(initialEntries);
      // Set form data for react-hook-form (like in the example)
      setValue(
        "absensis",
        data_siswa?.data?.map((s: any) => ({
          siswa_id: s.siswa?.id,
          status: "Alpha",
          keterangan: "",
        }))
      );
    }
  }, [ekskul_name, data_siswa, setValue]);

  const handleStatusChange = (
    siswaId: number,
    status: "Hadir" | "Sakit" | "Izin" | "Alpha"
  ) => {
    // Update UI state
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === siswaId
          ? {
              ...entry,
              hadir: status === "Hadir",
              sakit: status === "Sakit",
              izin: status === "Izin",
              alpa: status === "Alpha",
            }
          : entry
      )
    );

    // Update react-hook-form fields (like in the example)
    const fieldIndex = fields.findIndex(
      (field: any) => field.siswa_id === siswaId
    );
    if (fieldIndex !== -1) {
      const statusCapitalized =
        status.charAt(0).toUpperCase() + status.slice(1);
      setValue(
        `absensis.${fieldIndex}.status`,
        statusCapitalized as "Hadir" | "Izin" | "Sakit" | "Alpha"
      );
    }
  };

  const handleKeteranganChange = (siswaId: number, keterangan: string) => {
    // Update UI state
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === siswaId ? { ...entry, keterangan } : entry
      )
    );

    // Update react-hook-form fields (like in the example)
    const fieldIndex = fields.findIndex(
      (field: any) => field.siswa_id === siswaId
    );
    if (fieldIndex !== -1) {
      setValue(`absensis.${fieldIndex}.keterangan`, keterangan);
    }
  };

  const handleAbsen = (data: FormModelType) => {
    console.log("Data Absensi:", data);
    onSubmit(data);
  };

  const StatusIndicator: React.FC<{
    isActive: boolean;
    color: string;
    onClick: () => void;
  }> = ({ isActive, color, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
        isActive
          ? `${color} border-gray-300`
          : "bg-gray-200 border-gray-300 hover:bg-gray-300"
      }`}
    />
  );

  const handleSetAllHadir = () => {
    // Update UI state semua siswa jadi hadir
    setEntries((prevEntries) =>
      prevEntries.map((entry) => ({
        ...entry,
        hadir: true,
        sakit: false,
        izin: false,
        alpa: false,
      }))
    );

    fields.forEach((field: any, index: number) => {
      setValue(`absensis.${index}.status`, "Hadir");
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <div onClick={(e) => e.stopPropagation()}>
          <Sidebar sidebar="tutor" />
        </div>
        <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
          <div onClick={(e) => e.stopPropagation()}>
            <Header />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="TUTOR" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        {success && (
          <Popup
            label="Absen Berhasil"
            message={success_message}
            navigateTo={`/tutor-siswa/riwayat/${id}`}
            isSuccess={true}
            stateConcition={state.post}
            stateName="post"
          />
        )}
        {error && (
          <Popup
            label="Absen Gagal"
            message={error_message}
            navigateTo=""
            isSuccess={false}
            stateConcition={state.post}
            stateName="post"
          />
        )}

        <div className="overflow-scroll scrollbar-hide w-full">
          <div className="flex-1 m-4 scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Absensi
              </p>
            </div>
            <div className="p-5 bg-white shadow-md rounded-md">
              <div className="mx-auto bg-white">
                <form onSubmit={handleSubmit(handleAbsen)}>
                  {/* Form Header */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Ekstrakurikuler
                      </label>
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {ekskul_name?.data?.nama_ekskul || "Ekstrakurikuler"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal :
                      </label>
                      <input
                        type="date"
                        {...register("tanggal")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Agenda */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agenda :
                    </label>
                    <textarea
                      {...register("agenda")}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan Agenda..."
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleSetAllHadir}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      Tandai Semua Hadir
                    </button>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left py-3 px-2 font-medium text-gray-700">
                            No
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            Hadir
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            Sakit
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            Izin
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            Alpa
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            Nama
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fields.map((field, index) => {
                          const siswa = data_siswa?.data?.find(
                            (s: any) => s.siswa.id === field.siswa_id
                          );
                          const entry = entries.find(
                            (e) => e.id === field.siswa_id
                          );

                          return (
                            <tr
                              key={field.id}
                              className="border-b border-gray-200 hover:bg-gray-50"
                            >
                              <td className="py-3 px-2 text-gray-600">
                                {index + 1}
                              </td>

                              <td className="py-3 px-4">
                                <StatusIndicator
                                  isActive={entry?.hadir || false}
                                  color="bg-green-500"
                                  onClick={() =>
                                    handleStatusChange(field.siswa_id, "Hadir")
                                  }
                                />
                              </td>
                              <td className="py-3 px-4">
                                <StatusIndicator
                                  isActive={entry?.sakit || false}
                                  color="bg-blue-500"
                                  onClick={() =>
                                    handleStatusChange(field.siswa_id, "Sakit")
                                  }
                                />
                              </td>
                              <td className="py-3 px-4">
                                <StatusIndicator
                                  isActive={entry?.izin || false}
                                  color="bg-yellow-500"
                                  onClick={() =>
                                    handleStatusChange(field.siswa_id, "Izin")
                                  }
                                />
                              </td>
                              <td className="py-3 px-4">
                                <StatusIndicator
                                  isActive={entry?.alpa || false}
                                  color="bg-red-500"
                                  onClick={() =>
                                    handleStatusChange(field.siswa_id, "Alpha")
                                  }
                                />
                              </td>
                              <td className="py-3 px-4 text-blue-600">
                                {siswa?.siswa?.nama}
                              </td>
                              <td className="py-3 px-4">
                                <div></div>
                                <input
                                  type="text"
                                  {...register(`absensis.${index}.keterangan`)}
                                  onChange={(e) =>
                                    handleKeteranganChange(
                                      field.siswa_id,
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  placeholder="Keterangan..."
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Info */}
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {fields?.length || 0} of {fields?.length || 0}{" "}
                    entries
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => {
                        setValue("ekskul_id", Number(id));
                      }}
                      type="submit"
                      className="px-6 cursor-pointer py-2 flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                      disabled={isLoading_absensi || !fields?.length}
                    >
                      <p>Simpan</p>
                      {isLoading_absensi && <LoadingSpinner />}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsensiEkskul;
