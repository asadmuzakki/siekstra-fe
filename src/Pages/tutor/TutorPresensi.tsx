import { useEffect, useState } from "react";

import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import * as Get from "../../Hooks/useGet";
import * as Delete from "../../Hooks/useDelete";
import { useGlobalContext } from "../../Context/Context";
import AttendanceForm from "../../Components/AttendenceForm";
import Popup from "../../Components/Popup";
import { useCookies } from "react-cookie";
import { FiSearch } from "react-icons/fi";

const TutorPresensi = () => {
  const [cookie] = useCookies(["user_id"]);
  const { stateHandle, state } = useGlobalContext();
  const [successPost, setSuccessPost] = useState(false);
  const [errorPost, setErrorPost] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [selectedAbsensiId, setSelectedAbsensiId] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [dataFiltered, setDataFiltered] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    onDelete,
    isLoadng: isLoadingDelete,
    error: errorDelete,
    success: successDelete,
  } = Delete.useDeleteAbsenTutor();

  const { data, isLoading } = Get.useGetAbsensiTutor();

  const handleEdit = (id: string) => {
    setSelectedAbsensiId(id);
    setOpenEdit(true);
    setOpenCreate(false);
    stateHandle("showPopAbsen", true);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
    setOpenEdit(false);
    setSelectedAbsensiId("");
    stateHandle("showPopAbsen", true);
  };
  const handleCloseForm = () => {
    setOpenCreate(false);
    setOpenEdit(false);
    stateHandle("showPopAbsen", false);
  };

  const renderPopup = () => (
    <>
      {successDelete && (
        <Popup
          label="Delete Berhasil"
          message="Delete Berhasil"
          navigateTo=""
          isSuccess={true}
          stateConcition={state.delete}
          stateName="delete"
        />
      )}
      {errorDelete && (
        <Popup
          label="Delete Gagal"
          message="Delete Gagal"
          navigateTo=""
          isSuccess={false}
          stateConcition={state.delete}
          stateName="delete"
        />
      )}
      {successPost && (
        <Popup
          label="Absen Berhasil"
          message="Absensi Berhasil"
          navigateTo=""
          isSuccess={true}
          stateConcition={state.post}
          stateName="post"
        />
      )}
      {errorPost && (
        <Popup
          label="Absen Gagal"
          message="Absensi Gagal"
          navigateTo=""
          isSuccess={false}
          stateConcition={state.post}
          stateName="post"
        />
      )}
      {successUpdate && (
        <Popup
          label="Update Absen Berhasil"
          message="Update Absensi Berhasil"
          navigateTo=""
          isSuccess={true}
          stateConcition={state.update}
          stateName="update"
        />
      )}
      {errorUpdate && (
        <Popup
          label="Update Absen Gagal"
          message="Update Absensi Gagal"
          navigateTo=""
          isSuccess={false}
          stateConcition={state.update}
          stateName="update"
        />
      )}
    </>
  );
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const hasilFilter = data?.data?.filter((item: any) =>
        String(item.ekskul.nama_ekskul)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setDataFiltered(hasilFilter);
      console.log(dataFiltered);
    } else {
      setDataFiltered(data?.data);
    }
  }, [data, searchQuery]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebar="tutor" />

      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <Header />

        {isLoadingDelete && (
          <div className="fixed inset-0 w-full h-screen bg-black opacity-50 z-50" />
        )}

        {(openCreate || openEdit) && (
          <AttendanceForm
            tutor_id={cookie.user_id}
            update={openCreate ? false : true}
            success={openCreate ? setSuccessPost : setSuccessUpdate}
            error={openCreate ? setErrorPost : setErrorUpdate}
            id_absen={selectedAbsensiId}
            handleClose={handleCloseForm}
          />
        )}

        {renderPopup()}

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="overflow-scroll scrollbar-hide w-full">
            <div className="flex-1 m-4 scrollbar-hide">
              <div className="w-full flex justify-between mb-6">
                <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                  Absensi Tutor
                </p>
              </div>

              <div className="p-5 bg-white shadow-md rounded-md">
                <div className="flex justify-start items-center w-full text-lg  pb-2 text-gray-600">
                  RIWAYAT PRESENSI
                </div>
                <div className="w-full flex justify-end items-center">
                  <button
                    onClick={() => {
                      handleOpenCreate();
                    }}
                    className="text-white bg-blue-500 px-5 py-2 rounded hover:cursor-pointer"
                  >
                    Tambah
                  </button>
                </div>
                <div className="mt-5">
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
                    fromComponent="TutorPresensi"
                    label={[
                      "Nama Ektrakurikuler",
                      "Status",
                      "Keterangan",
                      "waktu",
                      "Jam",
                    ]}
                    data={dataFiltered || []}
                    action={true}
                    keys={[
                      "ekskul",
                      "status",
                      "keterangan",
                      "tanggal",
                      "created_at",
                    ]}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
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

export default TutorPresensi;
