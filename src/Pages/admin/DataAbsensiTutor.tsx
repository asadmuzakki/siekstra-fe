/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetDataAbsensiTutor } from "../../Hooks/Admin/useGet";
import Popup from "../../Components/Popup";
import { useDeleteDataAbsensiTutorById } from "../../Hooks/Admin/useDelete";
import CardCreateDataAbsensiTutor from "../../Components/CardCreateDataAbsensiTutor";
import CardUpdateDataAbsensiTutor from "../../Components/CardUpdateDataAbsensiTutor";
import { useGlobalContext } from "../../Context/Context";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FiSearch } from "react-icons/fi";

const DataAbsensiTutor = () => {
  const { state } = useGlobalContext();

  const currentYear = new Date().getFullYear();
  const [tahun, setTahun] = useState<number>(currentYear);

  const { data, isLoading } = useGetDataAbsensiTutor(tahun.toString());
  const { onDelete, isLoadingDelete, errorDelete, successDelete } =
    useDeleteDataAbsensiTutorById();

  useEffect(() => {
    console.log(data);
  }, [data]);

  // State untuk popup form
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idAbsensiTutor, setIdAbsensiTutor] = useState<string | null>(null);
  const [dataFiltered, setDataFiltered] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  // State untuk create / update / delete feedback
  const [successCreate, setSuccessCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);

  // Format data sebelum dilempar ke GeneralTable
  const formattedData =
    data?.data.map((item: any) => ({
      ...item,
      waktu: new Date(item.tanggal).toLocaleDateString("id-ID"),
      nama_tutor: item.tutor?.name || "Tidak Tersedia",
      nama_ekskul: item.ekskul?.nama_ekskul || "Tidak Tersedia",
    })) || [];

  const handleDeleteDataAbsensiTutor = (id: string) => {
    onDelete(id);
  };

  const handleEditDataAbsensiTutor = (id: string) => {
    setIdAbsensiTutor(id);
    setIsEdit(true);
    setShowPopup(true);
  };

  // Export Excel
  const exportToExcel = () => {
    const exportData = formattedData.map((row: any, index: number) => ({
      No: index + 1,
      "Nama Tutor": row.nama_tutor,
      "Nama Ekskul": row.nama_ekskul,
      Status: row.status,
      Keterangan: row.keterangan ?? "-",
      Waktu: row.waktu,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Absensi Tutor");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, `absensi_tutor_${tahun}.xlsx`);
  };

  const idAbsensiTutorString = idAbsensiTutor ?? "";

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const hasilFilter = formattedData.filter((item: any) =>
        String(item.nama_tutor).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDataFiltered(hasilFilter);
      console.log(dataFiltered);
    } else {
      setDataFiltered(formattedData);
    }
  }, [searchQuery, data]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="admin" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>

        {/* Loading overlay delete */}
        {isLoadingDelete && (
          <div className="fixed inset-0 w-full h-screen bg-black opacity-50 z-50"></div>
        )}

        {/* Popup feedback */}
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

        {/* Konten utama */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="overflow-scroll scrollbar-hide w-full">
            <div className="flex-1 m-4 scrollbar-hide">
              <div className="w-full flex justify-between mb-4 items-center">
                <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                  Data Absensi Tutor
                </p>
              </div>

              <div className="flex items-center gap-2 pb-4">
                <label className="text-sm text-gray-600">Tahun:</label>
                <select
                  value={tahun}
                  onChange={(e) => setTahun(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
                    (yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    )
                  )}
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={exportToExcel}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                    disabled={formattedData.length === 0}
                  >
                    Export Excel
                  </button>
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setShowPopup(true);
                    }}
                    className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                  >
                    Tambah
                  </button>
                </div>
              </div>

              <div className="p-5 bg-white shadow-md rounded-md mb-10">
                {/* Popup Form */}
                {showPopup &&
                  (isEdit ? (
                    <CardUpdateDataAbsensiTutor
                      setShow={setShowPopup}
                      setSuccessUpdate={setSuccessUpdate}
                      setErrorUpdate={setErrorUpdate}
                      idAbsensiTutor={idAbsensiTutorString}
                    />
                  ) : (
                    <CardCreateDataAbsensiTutor
                      setShow={setShowPopup}
                      setSuccessCreate={setSuccessCreate}
                      setErrorCreate={setErrorCreate}
                    />
                  ))}
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
                      "Nama Tutor",
                      "Nama Ekskul",
                      "Status",
                      "Keterangan",
                      "Waktu",
                    ]}
                    data={dataFiltered || []}
                    action={true}
                    keys={[
                      "nama_tutor",
                      "nama_ekskul",
                      "status",
                      "keterangan",
                      "waktu",
                    ]}
                    onDelete={handleDeleteDataAbsensiTutor}
                    onEdit={handleEditDataAbsensiTutor}
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

export default DataAbsensiTutor;
