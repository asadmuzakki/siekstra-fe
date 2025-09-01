/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetRiwayatPendaftaran } from "../../Hooks/Admin/useGet";
import { useGetDataEkskulAdmin } from "../../Hooks/Admin/useGet";
import { useUpdatePendaftaran } from "../../Hooks/Admin/usePatch";
import GeneralTable from "../../Components/GeneralTable";
import EditPendaftaranPopUp from "../../Components/EditPendaftaranPopup";
import Popup from "../../Components/Popup";

const RiwayatPendaftaran = () => {
  const { data, isLoading, isError, error } = useGetRiwayatPendaftaran();
  const { data: dataEkskul } = useGetDataEkskulAdmin();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [newEkskulId, setNewEkskulId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // header tabel
  const labels = [
    "Nama Ekskul",
    "Nama Siswa",
    "Tanggal Pendaftaran",
    "Jumlah Pindah",
  ];
  const keys = ["ekskul", "siswa", "tanggal_pendaftaran", "jumlah_pindah"];

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    setSelectedRow(null);
    setNewEkskulId(null);
  };

  const { onSubmit_update } = useUpdatePendaftaran(selectedRow?.id);

  const handlePindah = () => {
    if (!selectedRow || !newEkskulId) return;

    onSubmit_update(
      {
        siswa_id: selectedRow.siswa.id,
        ekskul_id: newEkskulId,
      },
      {
        onSuccess: () => {
          console.log("✅ Pindah berhasil");
          setShowPopup(true); // tampilkan popup sukses
          handleClose(); // tutup modal pindah
        },
        onError: (err) => {
          console.error("❌ Pindah gagal:", err);
        },
      }
    );
  };

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
    if (!isLoading && data) {
      console.log("Riwayat Pendaftaran:", data);
    }
  }, [data, isError, error, isLoading]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="admin" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        <div className="overflow-scroll scrollbar-hide w-full">
          <div className="flex-1 m-4 scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Riwayat Pendaftaran Ekstrakurikuler
              </p>
            </div>

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="p-5 bg-white shadow-md rounded-md mb-10">
                <GeneralTable
                  label={labels}
                  keys={keys}
                  data={data?.data || []} // ⚡ langsung dari API
                  fromComponent="RiwayatPendaftaran"
                  action
                  onEdit={(row) => handleEdit(row)}
                  onDelete={(id) => console.log("Delete:", id)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Pindah Ekskul */}
      <EditPendaftaranPopUp
        isOpen={isPopupOpen}
        onClose={handleClose}
        title="Pindah Ekskul"
      >
        {selectedRow && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Siswa
              </label>
              <input
                type="text"
                value={selectedRow.siswa?.nama || "-"}
                disabled
                className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ekskul Sekarang
              </label>
              <input
                type="text"
                value={selectedRow.ekskul?.nama_ekskul || "-"}
                disabled
                className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pindah ke Ekskul
              </label>
              <select
                value={newEkskulId ?? ""}
                onChange={(e) => setNewEkskulId(Number(e.target.value))}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">-- Pilih Ekskul --</option>
                {dataEkskul?.data?.map((ek: any) => (
                  <option key={ek.id} value={ek.id}>
                    {ek.nama_ekskul}
                  </option>
                ))}
              </select>
            </div>

            {/* ❌ Peringatan kalau sudah 2 kali pindah */}
            {(selectedRow?.jumlah_pindah ?? 0) >= 2 && (
              <p className="text-red-500 text-sm">
                Siswa ini sudah melakukan pindah ekskul maksimal 2 kali.
              </p>
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500"
              >
                Batal
              </button>
              <button
                onClick={handlePindah}
                disabled={
                  !newEkskulId || (selectedRow?.jumlah_pindah ?? 0) >= 2
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                Pindah
              </button>
            </div>
          </div>
        )}
      </EditPendaftaranPopUp>
      <Popup
        label="Berhasil"
        message="Siswa berhasil dipindahkan ke ekskul baru."
        isSuccess={true}
        stateConcition={showPopup}
        stateName="update"
        reload={true}
      />
    </div>
  );
};

export default RiwayatPendaftaran;
