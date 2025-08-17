import { useEffect, useState } from "react";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

import type { FormModelType } from "../../Models/ekskul.model";


import { data, useParams } from "react-router-dom";
import * as Get from "../../Hooks/useGet";
import * as Patch from "../../Hooks/usePatch";
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

const UpdateAbsensiEkskul = () => {
  const { absensi_id, ekskul_id } = useParams();
  const { state } = useGlobalContext();
  const { data: ekskul_name, isLoading: isLoading_ekskul_name } =
    Get.useGetEkskulById(String(ekskul_id));
  const { data: GetAbsensi, isLoading: isLoading_GetAbsensi } =
    Get.useGetAbsensiEkskulById(String(absensi_id));

  const {
    handleSubmit,
    register,
    onSubmit,
    fields,
    setValue,
    isLoading: isLoading_update_absensi,
    success,
    error,
  } = Patch.useUpdateAbsensiEkskul(String(absensi_id));
  const {data:data_siswa, isLoading} = Get.useGetSiswa1(String(ekskul_id));
  const [dataAbsensi, setDataAbsensi] = useState<any[]>([]);
  const [entries, setEntries] = useState<AbsensiEntry[]>([]);
  const [agenda, setAgenda] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>("");

  useEffect(() => {
    
    console.log(data_siswa);
    
    
    if (GetAbsensi) {
      setDataAbsensi(GetAbsensi?.data?.details || []);
      setTanggal(GetAbsensi?.data?.tanggal || "");

      setAgenda(GetAbsensi?.data?.agenda || "");
    }
  }, [GetAbsensi, data_siswa]);

  useEffect(() => {
    if (data_siswa && data_siswa?.data?.length > 0) {
      // Initialize entries for UI display
      const initialEntries: AbsensiEntry[] = data_siswa?.data?.map(
        (s: any, index: number) => {
          // Check if there's existing absensi data for this student
          const existingAbsensi = dataAbsensi.find(
            (abs: any) => abs.siswa_id === s.siswa.id
          );

          return {
            id: s.siswa?.id || index,
            nama: s.siswa?.nama || `Siswa ${index + 1}`,
            hadir: existingAbsensi?.status === "Hadir" || false,
            sakit: existingAbsensi?.status === "Sakit" || false,
            izin: existingAbsensi?.status === "Izin" || false,
            alpa: existingAbsensi?.status === "Alpha" || false,
            keterangan: existingAbsensi?.keterangan || "",
          };
        }
      );

      setEntries(initialEntries);

      // Set form data for react-hook-form
      setValue(
        "absensis",
        data_siswa?.data?.map((s: any) => {
          const existingAbsensi = dataAbsensi.find(
            (abs: any) => abs.siswa_id === s.siswa.id
          );
          return {
            siswa_id: s.siswa.id,
            status: existingAbsensi?.status || "Alpha",
            keterangan: existingAbsensi?.keterangan || "",
          };
        })
      );
    }
  }, [data, setValue, dataAbsensi, data_siswa]);

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

    // Update react-hook-form fields
    const fieldIndex = fields.findIndex(
      (field: any) => field.siswa_id === siswaId
    );
    if (fieldIndex !== -1) {
      setValue(
        `absensis.${fieldIndex}.status`,
        status as "Hadir" | "Izin" | "Sakit" | "Alpha"
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

    // Update react-hook-form fields
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`w-4 h-4 rounded-full border-2 transition-all cursor-pointer hover:scale-110 ${
        isActive
          ? `${color} border-gray-400 ring-2 ring-offset-1 ring-gray-300`
          : "bg-gray-200 border-gray-300 hover:bg-gray-300"
      }`}
    />
  );

  if (isLoading || isLoading_GetAbsensi || isLoading_ekskul_name) {
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
            label="Update Berhasil"
            message="Update Berhasil"
            navigateTo={`/tutor-siswa/riwayat/${ekskul_id}`}
            isSuccess={true}
            stateConcition={state.update}
            stateName="update"
          />
        )}
        {error && (
          <Popup
            label="Update Gagal"
            message="Update Gagal"
            navigateTo=""
            isSuccess={false}
            stateConcition={state.update}
            stateName="update"
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
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                        {ekskul_name?.data?.nama_ekskul ||
                          "Ekskul Tidak Ditemukan"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal :
                      </label>
                      <input
                        value={tanggal}
                        type="date"
                        onChange={(e) => setTanggal(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Agenda */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agenda :
                    </label>
                    <textarea
                      value={agenda}
                      onChange={(e) => setAgenda(e.target.value)}
                      // {...register("agenda")}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan Agenda..."
                    />
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
                        {fields.map((field: any, index: number) => {
                          const siswa = data_siswa?.data?.find(
                            (s: any) => s.siswa.id === field.siswa_id
                          );

                          // Get current entry from local state
                          const currentEntry = entries.find(
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
                                  isActive={currentEntry?.hadir || false}
                                  color="bg-green-500"
                                  onClick={() =>
                                    handleStatusChange(field.siswa_id, "Hadir")
                                  }
                                />
                              </td>
                              <td className="py-3 px-4">
                                <StatusIndicator
                                  isActive={currentEntry?.sakit || false}
                                  color="bg-blue-500"
                                  onClick={() =>
                                    handleStatusChange(field.siswa_id, "Sakit")
                                  }
                                />
                              </td>
                              <td className="py-3 px-4">
                                <StatusIndicator
                                  isActive={currentEntry?.izin || false}
                                  color="bg-yellow-500"
                                  onClick={() =>
                                    handleStatusChange(field.siswa_id, "Izin")
                                  }
                                />
                              </td>
                              <td className="py-3 px-4">
                                <StatusIndicator
                                  isActive={currentEntry?.alpa || false}
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
                                <input
                                  type="text"
                                  {...register(`absensis.${index}.keterangan`)}
                                  value={currentEntry?.keterangan || ""}
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
                        setValue("ekskul_id", Number(ekskul_id));
                        setValue("agenda", agenda);
                        setValue("tanggal", tanggal);
                      }}
                      type="submit"
                      className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                      disabled={isLoading_update_absensi || !fields?.length}
                    >
                      <p>Simpan</p>
                      {isLoading_update_absensi && <LoadingSpinner />}
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

export default UpdateAbsensiEkskul;
