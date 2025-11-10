/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Button from "../../Components/Button";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import * as Get from "../../Hooks/useGet";
import * as Delete from "../../Hooks/useDelete";

import { useNavigate, useParams } from "react-router-dom";
import Popup from "../../Components/Popup";
import { useGlobalContext } from "../../Context/Context";
import { FiSearch } from "react-icons/fi";

const RiwayatAbsensiEkskul = () => {
  const { id } = useParams();
  const { data, isLoading } = Get.useRiwayatAbsensi(String(id));
  const {
    onDelete,
    isLoadng: isLoading_delete,
    error,
    success,
    error_message,
    success_message,
  } = Delete.useDeleteAbsensi();
  const navigate = useNavigate();
  const { state } = useGlobalContext();

  // const editdelete = (id: string) => {
  //   alert(id);
  // };
  const [dataFiltered, setDataFiltered] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const dataResult = data?.data;
    if (searchQuery.trim() !== "") {
      const hasilFilter = dataResult?.filter((item: any) =>
        String(item.agenda)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setDataFiltered(hasilFilter as []);
      console.log(dataFiltered);
    } else {
      setDataFiltered(dataResult as []);
    }
    console.log(data);
  });

  const editAbsensi = (id_absensi: string) => {
    navigate(`/tutor-siswa/riwayat/update-absensi/${id_absensi}/${id}`);
  };
  const deleteAbsensi = (id_absensi: string) => {
    onDelete(id_absensi);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="tutor" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        {success && (
          <Popup
            label="Delete Berhasil"
            message={success_message}
            navigateTo=""
            isSuccess={true}
            stateConcition={state.delete}
            stateName="delete"
          />
        )}
        {error && (
          <Popup
            label="Delete Gagal"
            message={error_message}
            navigateTo=""
            isSuccess={false}
            stateConcition={state.delete}
            stateName="delete"
          />
        )}

        {isLoading_delete && (
          <div className="fixed inset-0 w-full h-screen bg-black opacity-50 z-50"></div>
        )}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="overflow-scroll scrollbar-hide  w-full">
            <div className="flex-1 m-4  scrollbar-hide">
              <div className="w-full flex justify-between mb-6">
                <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                  Siswa
                </p>
              </div>
              <div className="p-5 bg-white shadow-md rounded-md">
                <div className="flex justify-start items-center w-full py-5 text-gray-600 ">
                  Riwayat Presensi {sessionStorage.getItem("nama_ekskul")}
                </div>
                <div
                  onClick={() => {
                    navigate(`/tutor-siswa/riwayat/absensi/${id}`);
                  }}
                >
                  <Button buttonLabel="Tambah" />
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

                  <GeneralTable
                    fromComponent="RiwayatAbsensi"
                    label={[
                      "Agenda",
                      "Jumlah Siswa",
                      "Hadir",
                      "Sakit",
                      "Izin",
                      "Alpha",
                      "Waktu",
                    ]}
                    data={dataFiltered || []}
                    action={true}
                    keys={[
                      "agenda",
                      "jumlah_siswa",
                      "hadir",
                      "sakit",
                      "izin",
                      "alpha",
                      "tanggal",
                    ]}
                    onEdit={editAbsensi}
                    onDelete={deleteAbsensi}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatAbsensiEkskul;
