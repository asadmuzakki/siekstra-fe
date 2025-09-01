/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetNilaiBySiswa } from "../../Hooks/WaliMurid/useGet";

const Nilai = () => {
  const { id } = useParams<{ id: string }>(); // ambil siswa_id dari URL
  const currentYear = new Date().getFullYear();
  const [tahun, setTahun] = useState<string>(currentYear.toString());

  const { data, isLoading, isError, error } = useGetNilaiBySiswa(id!, tahun);

  useEffect(() => {
    console.log("Data nilai siswa:", data);
  }, [data]);

  const label = [
    "Ekstrakurikuler",
    "Kelas",
    "Kehadiran",
    "Keaktifan",
    "Praktik",
    "Nilai Akhir",
    "Index Nilai",
    "Tanggal",
  ];

  const keys = [
    "nama_ekskul",
    "kelas",
    "kehadiran",
    "keaktifan",
    "praktik",
    "nilai_akhir",
    "index_nilai",
    "tanggal",
  ];

  // bikin list tahun (misalnya 2020 - currentYear)
  const tahunOptions = Array.from({ length: currentYear - 2019 }, (_, i) =>
    (2020 + i).toString()
  );

  // di component Nilai
  const flattenedData =
    data?.data?.flatMap((item: any) =>
      item.details.map((d: any) => ({
        ...d,
        nama_ekskul: item.nama_ekskul, // ambil dari parent
        tanggal: item.tanggal, // simpan juga kalau mau
      }))
    ) || [];

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
                Nilai {namaAnak}
                
              </div>

              {/* Kondisi Loading / Error */}
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Gagal memuat: {error?.message}</p>
              ) : data?.data && data.data.length > 0 ? (
                <GeneralTable
                  fromComponent="RiwayatAbsensi"
                  label={label}
                  keys={keys}
                  data={flattenedData}
                  action={false}
                />
              ) : (
                <p className="text-gray-500">Belum ada data nilai</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nilai;
