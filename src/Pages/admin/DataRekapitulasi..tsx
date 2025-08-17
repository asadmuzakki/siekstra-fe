import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import GeneralTable from "../../Components/GeneralTable";
import { useGetRekapPenilaian } from "../../Hooks/Admin/useGet";
import { useGetRekapAbsensi } from "../../Hooks/Admin/useGet";

const DataRekapitulasi = () => {
  const navigate = useNavigate();

  // fetch data
  const {
    data: penilaianRes,
    isLoading: loadingPenilaian,
    isError: errorPenilaian,
  } = useGetRekapPenilaian();

  const {
    data: absensiRes,
    isLoading: loadingAbsensi,
    isError: errorAbsensi,
  } = useGetRekapAbsensi();

  // Mapping data penilaian
  const penilaianData =
    penilaianRes?.data?.map((item: any) => ({
      siswa: item.nama_siswa,
      ekskul: item.nama_ekskul ?? "-",
      kelas: item.kelas,
      nilai: item.nilai_akhir,
      indeks: item.index_nilai,
      ket: item.keterangan ?? "-",
      tanggal: item.tanggal,
    })) || [];

  // definisi tabel penilaian
  const penilaianLabel = [
    "Siswa",
    "Ekskul",
    "Kelas",
    "Nilai",
    "Indeks",
    "Keterangan",
    "Tanggal",
  ];
  const penilaianKeys = [
    "siswa",
    "ekskul",
    "kelas",
    "nilai",
    "indeks",
    "ket",
    "tanggal",
  ];

  // Mapping data absensi
  const absensiData =
    absensiRes?.data?.map((item: any) => ({
      siswa: item.nama_siswa,
      ekskul: item.nama_ekskul ?? "-",
      kelas: item.kelas ?? "-",
      status: item.status,
      ket: item.keterangan ?? "-",
      tanggal: item.tanggal,
    })) || [];

  // definisi tabel absensi
  const absensiLabel = [
    "Siswa",
    "Ekskul",
    "Kelas",
    "Status",
    "Keterangan",
    "Tanggal",
  ];
  const absensiKeys = ["siswa", "ekskul", "kelas", "status", "ket", "tanggal"];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebar="admin" />

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <Header />

        <div className="p-6 overflow-scroll scrollbar-hide">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Rekapitulasi
          </h1>

          <div className="flex flex-col gap-6">
            {/* Card Rekap Penilaian */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Rekap Penilaian
              </h2>

              {loadingPenilaian ? (
                <p className="text-gray-500">Loading...</p>
              ) : errorPenilaian ? (
                <p className="text-red-500">Gagal memuat data</p>
              ) : (
                <GeneralTable
                  label={penilaianLabel}
                  keys={penilaianKeys}
                  data={penilaianData.slice(0, 5)} // tampilkan max 5
                  fromComponent="GeneralComponent"
                  action={false}
                />
              )}

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => navigate("/rekapitulasi/penilaian")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Lihat Detail
                </button>
              </div>
            </div>

            {/* Card Rekap Absensi */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Rekap Absensi
              </h2>

              {loadingAbsensi ? (
                <p className="text-gray-500">Loading...</p>
              ) : errorAbsensi ? (
                <p className="text-red-500">Gagal memuat data</p>
              ) : (
                <GeneralTable
                  label={absensiLabel}
                  keys={absensiKeys}
                  data={absensiData.slice(0, 5)} // tampilkan max 5
                  fromComponent="GeneralComponent"
                  action={false}
                />
              )}

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => navigate("/rekapitulasi/absensi")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataRekapitulasi;
