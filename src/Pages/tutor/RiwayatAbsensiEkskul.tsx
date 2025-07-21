import { useEffect } from "react";
import Button from "../../Components/Button";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import * as Get from "../../Hooks/useGet";
import * as Delete from "../../Hooks/useDelete";

import { useNavigate, useParams } from "react-router-dom";
import Popup from "../../Components/Popup";
import { useGlobalContext } from "../../Context/Context";

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
  useEffect(() => {
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
        <Sidebar sidebar="TUTOR" />
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
                  Riwayat Presensi
                </div>
                <div
                  onClick={() => {
                    navigate(`/tutor-siswa/riwayat/absensi/${id}`);
                  }}
                >
                  <Button buttonLabel="Tambah" />
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
                  data={(data ? data.data : []) as any[]}
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
        )}
      </div>
    </div>
  );
};

export default RiwayatAbsensiEkskul;
