/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { BiDetail } from "react-icons/bi";
import * as Get from "../../Hooks/useGet";
import { FiEdit, FiSearch } from "react-icons/fi";
import { CiTrash } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteNilaiSiswaBytutor } from "../../Hooks/useDelete";
import Popup from "../../Components/Popup";
import { useGlobalContext } from "../../Context/Context";

const TutorPenilaian = () => {
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [periode, setPeriode] = useState("Ganjil");
  const [tahun, setTahun] = useState(2025);
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useGlobalContext();
  const [dataFiltered, setDataFiltered] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: data_nilai_siswa, isLoading: isLoading_data_nilai_siswa } =
    Get.useGetNilaiSiswaTutor(
      String(id),
      String(entries),
      currentPage.toString(),
      periode,
      String(tahun)
    );

  const {
    onDelete,
    isLoadng: isLoading_delete_nilai_siswa,
    success,
    error,
  } = useDeleteNilaiSiswaBytutor();

  const itemsPerPage = entries;
  const totalPages = data_nilai_siswa?.data?.last_page || 1;
  const currentItems = data_nilai_siswa?.data?.data || [];

  const handleDeleteNilai = (id: string) => {
    onDelete(id);
  };
  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const hasilFilter = currentItems.filter(
        (item: any) =>
          String(item.kelas_ekskul?.nama_kelas)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          String(item.nama_ekskul)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setDataFiltered(hasilFilter);
      console.log(dataFiltered);
    } else {
      setDataFiltered(currentItems);
    }
    console.log("Data nilai : ", data_nilai_siswa);
    console.log(tahun);
  }, [periode, data_nilai_siswa, searchQuery]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="tutor" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        {isLoading_delete_nilai_siswa && (
          <div className="fixed inset-0 w-full h-screen bg-black opacity-50 z-50"></div>
        )}
        {success && (
          <Popup
            label="Delete Berhasil"
            message="Delete Berhasil"
            navigateTo=""
            isSuccess={true}
            stateConcition={state.delete}
            stateName="delete"
          />
        )}
        {error && (
          <Popup
            label="Delete Gagal"
            message="Delete Gagal"
            navigateTo=""
            isSuccess={false}
            stateConcition={state.delete}
            stateName="delete"
          />
        )}

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
                <div className="flex items-center justify-center gap-3">
                <select
                  value={periode}
                  onChange={(e) => setPeriode(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Periode</option>
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
                <select
                  value={tahun}
                  onChange={(e) => setTahun(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Tahun</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <label htmlFor="entries" className="text-gray-700 text-sm">
                  Tampilkan
                </label>
                <select
                  id="entries"
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={entries}
                  onChange={(e) => setEntries(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-gray-700 text-sm">entri</span>
              </div>

              <div className="p-5 bg-white shadow-md rounded-md">
                <div className="flex justify-start items-center w-full py-5 text-gray-600 ">
                  Riwayat Penilaian {sessionStorage.getItem("nama_ekskul")}
                </div>
                <div>
                  <div className=" w-full flex justify-end">
                    <div
                      className="flex items-center gap-2 w-80 border border-gray-300 rounded-lg px-3 py-2"
                      role="search"
                      aria-label="Form pencarian"
                    >
                      <FiSearch className="text-gray-500" size={18} />

                      <input
                        id="search-input"
                        type="search"
                        placeholder="Cari..."
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                        className="flex-1 text-sm outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-center py-3 px-2 font-medium text-gray-700">
                            No
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">
                            Nama Kelas
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">
                            Tahun Ajaran
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">
                            Status
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">
                            Periode
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">
                            Tanggal
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {dataFiltered.map((data: any, index: number) => (
                          <tr
                            key={data.id}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 text-center text-gray-600">
                              {index + 1 + (currentPage - 1) * itemsPerPage}
                            </td>

                            {/* Nama kelas ekskul */}
                            <td className="py-3 px-4 text-center text-gray-600">
                              {data?.kelas_ekskul?.nama_kelas || "-"}
                            </td>

                            {/* Tahun ajaran */}
                            <td className="py-3 px-4 text-center text-gray-600">
                              {data?.kelas_ekskul?.tahun_ajaran || "-"}
                            </td>

                            {/* Status */}
                            <td className="py-3 px-4 text-center text-gray-600">
                              {data?.kelas_ekskul?.status || "-"}
                            </td>

                            {/* Periode */}
                            <td className="py-3 px-4 text-center text-gray-600">
                              {data?.kelas_ekskul?.periode || "-"}
                            </td>

                            {/* Tanggal */}
                            <td className="py-3 px-4 text-center text-gray-600">
                              {data?.tanggal || "-"}
                            </td>

                            {/* Aksi */}
                            <td className="text-center space-x-2 py-3 px-4">
                              <button
                                onClick={() => {
                                  navigate(
                                    `/tutor-siswa/penilaian/detail/${data.id}`
                                  );
                                }}
                                className="bg-green-100 text-green-700 p-2 rounded"
                              >
                                <BiDetail className="text-lg" />
                              </button>

                              <button
                                onClick={() => {
                                  navigate(
                                    `/tutor-siswa/penilaian/update-penilaian/${data.id}/${id}`
                                  );
                                }}
                                className="bg-blue-100 text-blue-700 p-2 rounded"
                              >
                                <FiEdit className="text-lg" />
                              </button>

                              <button
                                onClick={() => handleDeleteNilai(data.id)}
                                className="bg-red-100 text-red-700 p-2 rounded"
                              >
                                <CiTrash className="text-lg" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <button
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handleClick(page)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorPenilaian;
