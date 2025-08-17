import ExtracurricularBarChart from "../../Components/ExtracurricularBarChart";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const DashboardAdmin = () => {
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
              {[1, 2, 3, 4].map(() => (
                <div className="bg-white rounded-md shadow-md p-4 ">
                  <p className="text-base text-blue-600 font-medium">
                    Total Siswa
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">127</p>
                  <p className="text-sm text-gray-500 mt-1">Siswa terdaftar</p>
                </div>
              ))}
            </div>
            <div className="p-5 bg-white shadow-md rounded-md mb-10">
              <div className="flex justify-between items-center w-full mb-10">
                <p className="text-blue-500 font-semibold">
                  Grafik Pendaftaran Ekstrakurikuler
                </p>
                <select className="border border-gray-300 rounded-md px-7 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
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

              <ExtracurricularBarChart />
            </div>
            <div className="p-5 bg-white shadow-md rounded-md mb-10">
              <div className="flex justify-between items-center w-full mb-10">
                <p className="text-blue-500 font-semibold">
                  Grafik Kegiatan Ekstrakurikuler
                </p>
                <div className="flex items-center gap-3">
                  {/* Dropdown Jenis Lomba */}
                  <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Pilih Jenis Lomba</option>
                    <option value="matematika">Matematika</option>
                    <option value="sains">Sains</option>
                    <option value="olahraga">Olahraga</option>
                    <option value="musik">Musik</option>
                  </select>

                  {/* Dropdown Tingkat Lomba */}
                  <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Pilih Tingkat</option>
                    <option value="kabupaten">Kabupaten</option>
                    <option value="provinsi">Provinsi</option>
                    <option value="nasional">Nasional</option>
                    <option value="internasional">Internasional</option>
                  </select>

                    <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
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

              <ExtracurricularBarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
