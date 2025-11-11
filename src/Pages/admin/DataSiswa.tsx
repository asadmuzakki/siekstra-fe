import { useEffect, useState } from "react";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetDataSiswaAdmin } from "../../Hooks/Admin/useGet";
import CardCreateDataSiswa from "../../Components/CardCreateDataSiswa";
import { useGlobalContext } from "../../Context/Context";
import Popup from "../../Components/Popup";
import { useDeleteDataSiswaById } from "../../Hooks/Admin/useDelete";
import { FiSearch } from "react-icons/fi";

const DataSiswa = () => {
  const [kelas, setKelas] = useState("");

  const { data, isLoading } = useGetDataSiswaAdmin({
    kelas: kelas || undefined,
  });
  const { onDelete, isLoadingDelete, errorDelete, successDelete } =
    useDeleteDataSiswaById();
  const { state } = useGlobalContext();
  const [showPopup, setShowPopup] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSiswa, setIdSiswa] = useState("");

  const [dataFiltered, setDataFiltered] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteDataSiswa = (id: string) => {
    onDelete(id);
  };

  const handleEditDataSiswa = (id: string) => {
    setIdSiswa(id);
    setIsEdit(true);
    setShowPopup(true);
  };
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const hasilFilter = data?.data?.filter(
        (item: any) =>
          String(item.nama).toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(item.nis).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDataFiltered(hasilFilter);
      console.log(dataFiltered);
    } else {
      setDataFiltered(data?.data);
    }
    console.log(data);
  }, [
    data,
    successCreate,
    errorCreate,
    successUpdate,
    errorUpdate,
    searchQuery,
  ]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="admin" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        {isLoadingDelete && (
          <div className="fixed inset-0 w-full h-screen bg-black opacity-50 z-50"></div>
        )}
        {successCreate && (
          <Popup
            label="Create Berhasil"
            message="Create Berhasil"
            navigateTo=""
            isSuccess={true}
            stateConcition={state.post}
            stateName="post"
          />
        )}
        {errorCreate && (
          <Popup
            label="Create Gagal"
            message="Create Gagal"
            navigateTo=""
            isSuccess={false}
            stateConcition={state.post}
            stateName="post"
          />
        )}

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

        {successUpdate && (
          <Popup
            label="Update Berhasil"
            message="Update Berhasil"
            navigateTo=""
            isSuccess={true}
            stateConcition={state.update}
            stateName="update"
          />
        )}
        {errorUpdate && (
          <Popup
            label="Update Gagal"
            message="Update Gagal"
            navigateTo=""
            isSuccess={false}
            stateConcition={state.update}
            stateName="update"
          />
        )}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="overflow-scroll scrollbar-hide w-full">
            <div className="flex-1 m-4 scrollbar-hide">
              <div className="w-full flex justify-between mb-6">
                <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                  Data Siswa
                </p>
              </div>

              <div className="p-5 bg-white shadow-md rounded-md mb-10">
                  <p>Daftar Data Siswa</p>  
                <div className="flex justify-end items-center py-3 gap 2">
                  <button
                    onClick={() => {
                      setShowPopup(true);
                      setIsEdit(false);
                    }}
                    className="mr-2 px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                  >
                    Tambah
                  </button>
                  <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Kelas</option>
                    <option value="1">Kelas 1</option>
                    <option value="2">Kelas 2</option>
                    <option value="3">Kelas 3</option>
                    <option value="4">Kelas 4</option>
                    <option value="5">Kelas 5</option>
                    <option value="6">Kelas 6</option>
                  </select>
                </div>

                {showPopup && (
                  <div>
                    <CardCreateDataSiswa
                      setShow={setShowPopup}
                      setSuccessCreate={setSuccessCreate}
                      setErrorCreate={setErrorCreate}
                      setSuccessUpdate={setSuccessUpdate}
                      setErrorUpdate={setErrorUpdate}
                      isEdit={isEdit}
                      idSiswa={idSiswa}
                    />
                  </div>
                )}
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
                    fromComponent="GeneralComponent"
                    label={[
                      "NIS",
                      "Nama",
                      "Kelas",
                      "Jenis Kelamin",
                      "Wali Murid",
                      "Email Ortu",
                      "Ekstrakurikuler",
                    ]}
                    data={dataFiltered || []}
                    action={true}
                    keys={[
                      "nis",
                      "nama",
                      "kelas",
                      "jenis_kelamin",
                      "nama_ortu",
                      "email_ortu",
                      "pendaftarans",
                    ]}
                    onDelete={handleDeleteDataSiswa}
                    onEdit={handleEditDataSiswa}
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

export default DataSiswa;
