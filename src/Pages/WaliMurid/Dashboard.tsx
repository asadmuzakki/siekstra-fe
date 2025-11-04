/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useEffect } from "react";
import { useGetDataAnak } from "../../Hooks/WaliMurid/useGet";

const DashboardWaliMurid = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetDataAnak();
  

  useEffect(() => {
    console.log(data);
    
  }, [data]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="wali_murid" />
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
                    {data?.data && data.data.length > 0 ? (
                      data.data.map((anak: any, index: number) => (
                        <tr key={anak.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-center truncate">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-center truncate">
                            {anak.nis}
                          </td>
                          <td className="px-4 py-3 text-center truncate">
                            {anak.nama}
                          </td>
                          <td className="px-4 py-3 text-center truncate">
                            {anak.kelas}
                          </td>
                          <td className="px-4 py-3 text-center truncate">
                            {anak.pendaftarans && anak.pendaftarans.length > 0
                              ? anak.pendaftarans
                                  .map((p: any) => p.ekskul?.nama_ekskul)
                                  .join(", ")
                              : "-"}
                          </td>
                          <td className="px-4 py-3 text-center truncate space-x-2">
                            <button
                              onClick={() => navigate(`presensi/${anak.id}`)}
                              className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 cursor-pointer"
                            >
                              Presensi
                            </button>
                            <button
                              onClick={() => navigate(`nilai/${anak.id}`)}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 cursor-pointer"
                            >
                              Nilai
                            </button>
                            <button
                              onClick={() => navigate(`wali-kegiatan/${anak.id}`)}
                              className="px-3 py-1 bg-orange-400 text-white rounded text-xs hover:bg-orange-500 cursor-pointer"
                            >
                              Kegiatan
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center text-gray-500 py-4"
                        >
                          {isLoading
                            ? "Loading..."
                            : isError
                            ? `Gagal memuat data: ${error?.message ?? "Unknown error"}`
                            : "Belum ada data anak"}
                        </td>
                      </tr>
                    )}
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
