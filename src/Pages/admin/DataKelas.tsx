/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetDataKelasEkskulAdmin } from "../../Hooks/Admin/useGet";

import CardCreateDataKelasEkskul from "../../Components/CardCreateDataKelas";
import Popup from "../../Components/Popup";
import { useGlobalContext } from "../../Context/Context";
import { useDeleteKelasEkskulById } from "../../Hooks/Admin/useDelete";

const DataKelasEkskul = () => {
  const { data, isLoading } = useGetDataKelasEkskulAdmin();
  const { onDelete, isLoadingDelete, errorDelete, successDelete } =
    useDeleteKelasEkskulById();

  const { state } = useGlobalContext();

  const [showPopup, setShowPopup] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [idKelas, setIdKelas] = useState("");

  const [formattedData, setFormattedData] = useState<any[]>([]);

  // format data untuk table
  useEffect(() => {
    if (data?.data) {
      const temp = data.data.map((item: any) => ({
        ...item,
        nama_ekskul: item.ekskul?.nama_ekskul || "-",
      }));
      setFormattedData(temp);
    }
  }, [data]);

  // delete
  const handleDeleteKelasEkskul = (id: string) => {
    onDelete(id);
  };

  // edit
  const handleEditKelasEkskul = (id: string) => {
    setIdKelas(id);
    setIsEdit(true);
    setShowPopup(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="admin" />
      </div>

      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        {/* Header */}
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>

        {/* Loading delete overlay */}
        {isLoadingDelete && (
          <div className="fixed inset-0 w-full h-screen bg-black opacity-50 z-50"></div>
        )}

        {/* Popups */}
        {successCreate && (
          <Popup
            label="Create Berhasil"
            message="Create kelas ekskul berhasil"
            isSuccess={true}
            navigateTo=""
            stateConcition={state.post}
            stateName="post"
          />
        )}
        {errorCreate && (
          <Popup
            label="Create Gagal"
            message="Create kelas ekskul gagal"
            isSuccess={false}
            navigateTo=""
            stateConcition={state.post}
            stateName="post"
          />
        )}

        {successUpdate && (
          <Popup
            label="Update Berhasil"
            message="Update kelas ekskul berhasil"
            isSuccess={true}
            navigateTo=""
            stateConcition={state.update}
            stateName="update"
          />
        )}
        {errorUpdate && (
          <Popup
            label="Update Gagal"
            message="Update kelas ekskul gagal"
            isSuccess={false}
            navigateTo=""
            stateConcition={state.update}
            stateName="update"
          />
        )}

        {successDelete && (
          <Popup
            label="Delete Berhasil"
            message="Delete kelas ekskul berhasil"
            isSuccess={true}
            navigateTo=""
            stateConcition={state.delete}
            stateName="delete"
          />
        )}
        {errorDelete && (
          <Popup
            label="Delete Gagal"
            message="Delete kelas ekskul gagal"
            isSuccess={false}
            navigateTo=""
            stateConcition={state.delete}
            stateName="delete"
          />
        )}

        {/* Main Content */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="overflow-scroll scrollbar-hide w-full">
            <div className="flex-1 m-4 scrollbar-hide">
              <div className="w-full flex justify-between mb-6">
                <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                  Data Kelas Ekstrakurikuler
                </p>

                <button
                  onClick={() => {
                    setShowPopup(true);
                    setIdKelas("");
                    setIsEdit(false);
                  }}
                  className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Tambah
                </button>
              </div>

              <div className="p-5 bg-white shadow-md rounded-md mb-10">
                <div className="flex justify-between items-center py-3">
                  <p>Daftar Kelas Ekstrakurikuler</p>
                </div>

                {/* Card Create / Edit */}
                {showPopup && (
                  <CardCreateDataKelasEkskul
                    setShow={setShowPopup}
                    setSuccessCreate={setSuccessCreate}
                    setErrorCreate={setErrorCreate}
                    setSuccessUpdate={setSuccessUpdate}
                    setErrorUpdate={setErrorUpdate}
                    isEdit={isEdit}
                    idKelas={idKelas}
                  />
                )}

                {/* Table */}
                <GeneralTable
                  fromComponent="GeneralComponent"
                  label={[
                    "Nama Kelas",
                    "Nama Ekskul",
                    "Tahun Ajaran",
                    "Periode",
                    "Status",
                  ]}
                  data={formattedData}
                  action={true}
                  keys={[
                    "nama_kelas",
                    "nama_ekskul",
                    "tahun_ajaran",
                    "periode",
                    "status",
                  ]}
                  onEdit={handleEditKelasEkskul}
                  onDelete={handleDeleteKelasEkskul}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataKelasEkskul;
