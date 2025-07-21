import { useEffect } from "react";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

import { BiDetail } from "react-icons/bi";

import * as Get from "../../Hooks/useGet";
import { FiEdit } from "react-icons/fi";
import { CiTrash } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";

const TutorPenilaian = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: data_nilai_siswa, isLoading: isLoading_data_nilai_siswa } =
    Get.useGetNilaiSiswaTutor();
  useEffect(() => {
    console.log(data_nilai_siswa);
  });

  <div className="flex h-screen overflow-hidden">
    <div onClick={(e) => e.stopPropagation()}>
      <Sidebar sidebar="TUTOR" />
    </div>
    <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
      <div onClick={(e) => e.stopPropagation()}>
        <Header />
      </div>
    </div>
  </div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="TUTOR" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        {isLoading_data_nilai_siswa ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="overflow-scroll scrollbar-hide w-full">
            <div className="flex-1 m-4 scrollbar-hide">
              <div className="w-full flex justify-between mb-6">
                <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                  Nilai Siswa
                </p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition duration-200"
                  onClick={() => {
                    navigate(`/tutor-siswa/penilaian/tambah-penilaian/${id}`);
                  }}
                >
                  + Tambah
                </button>
              </div>
              <div className="p-5 bg-white shadow-md rounded-md">
                <div className="mx-auto bg-white">
                  {/* Form Header */}

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-center py-3 px-2 font-medium text-gray-700">
                            No
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">
                            Waktu
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data_nilai_siswa?.data?.map(
                          (data: any, index: number) => {
                            return (
                              <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50"
                              >
                                <td className="py-3 px-4 text-center text-gray-600">
                                  {index + 1}
                                </td>
                                <td className="py-3 px-4 text-center text-gray-600">
                                  {data?.tanggal}
                                </td>
                                <td className=" text-center space-x-2 py-3 px-4 ">
                                  <button
                                    onClick={() => {
                                      navigate(
                                        `/tutor-siswa/penilaian/detail/${data.id}`
                                      );
                                    }}
                                    className="bg-green-100  text-green-700 p-2 rounded cursor-pointer"
                                  >
                                    <BiDetail className="text-lg" />
                                  </button>
                                  <button className="bg-blue-100  text-blue-700 p-2 rounded cursor-pointer">
                                    <FiEdit className="text-lg" />
                                  </button>
                                  <button className="bg-red-100  text-red-700 p-2 rounded cursor-pointer">
                                    <CiTrash className="text-lg" />
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Info */}
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {data_nilai_siswa?.data?.length} entries
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {success && (
          <Popup
            label="Absen Kegiatan Berhasil"
            message={"Absen Kegiatan Berhasil"}
            navigateTo=""
            isSuccess={true}
            stateConcition={state.post}
            stateName="post"
          />
        )}
        {error && (
          <Popup
            label="Absen Kegiatan Gagal"
            message={"Absen Kegiatan Gagal"}
            navigateTo=""
            isSuccess={false}
            stateConcition={state.post}
            stateName="post"
          />
        )} */}
      </div>
    </div>
  );
};

export default TutorPenilaian;
