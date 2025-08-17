import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import * as Get from "../../Hooks/useGet";
import { useEffect } from "react";

const Kegiatan = () => {
  const { data, isLoading } = Get.useGetEkskul();
  useEffect(() => {
    console.log(data);
  });
  const navigate = useNavigate();
  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="tutor" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="overflow-scroll scrollbar-hide  w-full">
            <div className="flex-1 m-4  scrollbar-hide">
              <div className="w-full flex justify-between mb-6">
                <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                  Kegiatan
                </p>
              </div>
              <div className="p-5 bg-white shadow-md rounded-md">
                <div className="flex justify-start items-center w-full text-lg  pb-2 text-gray-600 ">
                  DAFTAR EKSTRAKURIKULER
                </div>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white overflow-hidden">
                    <thead className="text-gray-600 text-sm uppercase text-left">
                      <tr>
                        <th className="px-4 py-3 border-b border-gray-500 text-center">
                          No
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
                      {Array.isArray(data?.data) &&
                        data.data.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-50">
                            {/* Kolom Nomor */}
                            <td className="px-4 py-3 text-center">
                              {rowIndex + 1}
                            </td>

                            {/* Kolom Nama Ekstrakurikuler */}
                            <td className="px-4 py-3 text-center truncate">
                              {row.nama_ekskul}
                            </td>

                            {/* Kolom Aksi */}
                            <td className="text-center space-x-2">
                              <button
                                onClick={() => {
                                  navigate(`riwayat/${row.id}`);
                                }}
                                className="bg-green-100 text-green-700 p-2 rounded cursor-pointer"
                              >
                                Detail
                              </button>
                             
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kegiatan;
