import ExtracurricularBarChart from "../../Components/ExtracurricularBarChart";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useEffect } from "react";
import { useGetDataDashboard } from "../../Hooks/Admin/useGet";
import { useState } from "react";

const DashboardAdmin = () => {
  const { data, isLoading, isError, error } = useGetDataDashboard();
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    if (isError) {
      console.error("Error fetching dashboard data:", error);
    } else if (!isLoading && data) {
      console.log("Dashboard data:", data);
    }
  }, [isLoading, isError, data, error]);

  const stats = [
    {
      label: "Total Ekskul",
      value: data?.data?.total_ekskul ?? 0,
      subtitle: "Ekskul aktif",
    },
    {
      label: "Total Siswa",
      value: data?.data?.total_siswa ?? 0,
      subtitle: "Siswa terdaftar",
    },
    {
      label: "Total Tutor",
      value: data?.data?.total_tutor ?? 0,
      subtitle: "Tutor aktif",
    },
    {
      label: "Kehadiran Minggu Ini",
      value: data?.data?.kehadiran_minggu_ini ?? 0,
      subtitle: "Jumlah kehadiran",
    },
  ];

  const [kategori, setKategori] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [tahun, setTahun] = useState(new Date().getFullYear());

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="admin" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        <div className="overflow-scroll scrollbar-hide  w-full">
          <div className="flex-1 m-4  scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Dashboard
              </p>
            </div>

            <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((item, idx) => (
                <div key={idx} className="bg-white rounded-md shadow-md p-4">
                  <p className="text-base text-blue-600 font-medium">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="p-5 bg-white shadow-md rounded-md mb-10">
              <div className="flex justify-between items-center w-full mb-10">
                <p className="text-blue-500 font-semibold">
                  Grafik Pendaftaran Ekstrakurikuler
                </p>
                <select onChange={(e) => setYear(Number(e.target.value))} className="border border-gray-300 rounded-md px-7 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <ExtracurricularBarChart type="pendaftaran"
              tahun={year}
              />
            </div>
            <div className="p-5 bg-white shadow-md rounded-md mb-10">
              <div className="flex justify-between items-center w-full mb-10">
                <p className="text-blue-500 font-semibold">
                  Grafik Kegiatan Ekstrakurikuler
                </p>
                <div className="flex items-center gap-3">
                  {/* Dropdown Jenis Lomba */}
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Kategori Lomba</option>
                    <option value="lomba">Lomba</option>
                    <option value="non-lomba">Non-lomba</option>
                    <option value="lainnya">Lainnya</option>
                  </select>

                  {/* Dropdown Tingkat Lomba */}
                  <select
                    value={tingkat}
                    onChange={(e) => setTingkat(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Pilih Tingkat</option>
                    <option value="sekolah">Sekolah</option>
                    <option value="kota">Kota</option>
                    <option value="provinsi">Provinsi</option>
                    <option value="nasional">Nasional</option>
                  </select>

                  {/* Dropdown Tahun */}
                  <select
                    value={tahun}
                    onChange={(e) => setTahun(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {Array.from({ length: 5 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <ExtracurricularBarChart
                type="kegiatan"
                kategori={kategori}
                tingkat={tingkat}
                tahun={tahun}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
