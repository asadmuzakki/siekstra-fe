import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const DashboardWaliMurid = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="WALI_MURID" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        <div className="overflow-scroll scrollbar-hide  w-full">
          <div className="flex-1 m-4  scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Anak
              </p>
            </div>
            {/* Tabel */}
            <div className="p-5 bg-white shadow-md rounded-md">
              <div>
                <Button buttonLabel="Tambah" />
              </div>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white overflow-hidden ">
                  <thead className=" text-gray-600 text-sm uppercase text-left">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                        No
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                        NIS
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                        Nama
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                        Kelas
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                        Ekstrakurikuler
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    {/* Contoh baris data */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3  text-center truncate">1</td>
                      <td className="px-4 py-3  text-center truncate">
                        123456
                      </td>
                      <td className="px-4 py-3  text-center truncate">
                        Ahmad Yusuf
                      </td>
                      <td className="px-4 py-3  text-center truncate">9A</td>
                      <td className="px-4 py-3  text-center truncate">
                        Futsal
                      </td>
                      <td className="px-4 py-3  text-center truncate space-x-2">
                        <button className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 cursor-pointer">
                          Presensi
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 cursor-pointer">
                          Nilai
                        </button>
                      </td>
                    </tr>
                    {/* Tambahkan baris lainnya sesuai data */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWaliMurid;
