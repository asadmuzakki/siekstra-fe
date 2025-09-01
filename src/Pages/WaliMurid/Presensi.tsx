import { useState } from "react";
import { useParams } from "react-router-dom";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetAbsensiBySiswa } from "../../Hooks/WaliMurid/useGet";

import { useEffect } from "react";

const Presensi = () => {
  const { id } = useParams<{ id: string }>(); // ambil siswa_id dari URL
  const currentYear = new Date().getFullYear();

  const [tahun, setTahun] = useState<string>(currentYear.toString());

  const { data, isLoading, isError } = useGetAbsensiBySiswa(id!, tahun);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const label = [
    "Agenda",
    "Ekstrakurikuler",
    "status",
    "keterangan",
    "Tanggal",
  ];

  const keys = ["agenda", "ekstrakurikuler", "status", "keterangan", "tanggal"];

  // setelah ambil data dari API
  const mappedData =
    data?.data?.map((item: any) => {
      const detail = item.details?.[0] || {}; // ambil detail pertama (kalau ada)
      return {
        agenda: item.agenda,
        ekstrakurikuler: item.nama_ekskul,
        status: detail.status || "-",
        keterangan: detail.keterangan || "-",
        tanggal: item.tanggal,
      };
    }) || [];

  // bikin list tahun (misalnya 2020 - currentYear)
  const tahunOptions = Array.from({ length: currentYear - 2019 }, (_, i) =>
    (2020 + i).toString()
  );

  const namaAnak = data?.data?.[0]?.details?.[0]?.nama_siswa || "";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="wali_murid" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>

        <div className="overflow-scroll scrollbar-hide w-full">
          <div className="flex-1 m-4 scrollbar-hide">
            <div className="w-full flex justify-between items-center mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Anak
              </p>

              {/* Dropdown Tahun */}
              <select
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              >
                {tahunOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-5 bg-white shadow-md rounded-md">
              <div className="flex justify-start items-center w-full text-gray-600 text-lg mb-3">
                Riwayat Presensi {namaAnak}
                
              </div>

              {/* Kondisi Loading / Error */}
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Data tidak ditemukan </p>
              ) : data?.data && data.data.length > 0 ? (
                <GeneralTable
                  fromComponent="RiwayatAbsensi"
                  label={label}
                  keys={keys}
                  data={mappedData}
                  action={false}
                />
              ) : (
                <p className="text-gray-500">Belum ada data presensi</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presensi;
