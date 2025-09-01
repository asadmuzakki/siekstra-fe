/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetEkskul } from "../../Hooks/WaliMurid/useGet";
import PopUpCardWali from "../../Components/PopUpCardWali";

const DashboardEkskul = () => {
  const { data, isError, isLoading, error } = useGetEkskul();
  const [selectedEkskul, setSelectedEkskul] = useState<any | null>(null);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebar="wali_murid" />

      {/* Main */}
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <Header />

        <div className="overflow-scroll scrollbar-hide w-full">
          <div className="flex-1 m-4 scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Ekstrakurikuler
              </p>
            </div>

            <div className="p-5 bg-white shadow-md rounded-md">
              <div className="flex justify-start items-center w-full py-5 text-gray-600 text-lg font-semibold">
                Daftar Ekstrakurikuler Aktif
              </div>

              {/* Kondisi loading / error */}
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Gagal memuat: {error?.message}</p>
              ) : data?.data && data.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.data
                    .filter((ekskul: any) => ekskul.status === "aktif")
                    .map((ekskul: any) => (
                      <div
                        key={ekskul.id}
                        onClick={() => setSelectedEkskul(ekskul)}
                        className="cursor-pointer bg-white border border-gray-300 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        {/* Gambar */}
                        <div className="p-6">
                          <img
                            src={
                              ekskul.foto_url ??
                              "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&auto=format&fit=crop&q=60"
                            }
                            alt={ekskul.nama_ekskul}
                            className="w-full h-64 object-cover rounded-xl"
                          />
                        </div>

                        {/* Konten singkat */}
                        <div className="p-6 text-center">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {ekskul.nama_ekskul}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {ekskul.deskripsi}
                          </p>
                          <p className="text-xs text-gray-500">
                            {ekskul.jadwal} @ {ekskul.tempat}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">Belum ada data ekskul aktif</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      <PopUpCardWali
        isOpen={!!selectedEkskul}
        onClose={() => setSelectedEkskul(null)}
        title={selectedEkskul?.nama_ekskul}
      >
        {selectedEkskul && (
          <div className="space-y-4">
            <img
              src={
                selectedEkskul.foto_url ??
                "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&auto=format&fit=crop&q=60"
              }
              alt={selectedEkskul.nama_ekskul}
              className="w-full h-56 object-cover rounded-lg"
            />

            {/* Informasi utama */}
            <p className="text-gray-600">{selectedEkskul.deskripsi}</p>
            <p className="text-sm">
              <span className="font-semibold">Jadwal:</span>{" "}
              {selectedEkskul.jadwal} @ {selectedEkskul.tempat}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Tutor:</span>{" "}
              {selectedEkskul.tutor?.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Kelas:</span>{" "}
              {selectedEkskul.kelas_min} - {selectedEkskul.kelas_max}
            </p>

            {/* Syarat mengikuti */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Syarat Mengikuti Ekstrakurikuler:
              </h4>
              <ul className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                <li>Mengisi formulir pendaftaran</li>
                <li>Peserta memilih 1 ekskul saja</li>
                {!selectedEkskul.nama_ekskul
                  .toLowerCase()
                  .includes("robotik") && (
                  <>
                    <li>
                      Peserta boleh mengikuti kelas percobaan hanya 2 kali
                      pertemuan
                    </li>
                  </>
                )}
                {/* Tambahan khusus Robotika */}
                {selectedEkskul.nama_ekskul
                  .toLowerCase()
                  .includes("robotik") && (
                  <>
                    <li>
                      Tambahan biaya Rp. 45.000/pertemuan untuk kelas Robotika
                    </li>
                    <li>
                      Untuk kelas Robotika tidak ada kelas percobaan (tidak bisa
                      pindah ke ekstra kurikuler lainnya)
                    </li>
                    <li>
                      Pembayaran langsung ke admin Robotika bagi yang mengikuti
                    </li>
                    <li>
                      Pembayaran kelas Robotika bisa dilaksanakan pada pertemuan
                      ke-1 atau pertemuan ke-4
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </PopUpCardWali>
    </div>
  );
};

export default DashboardEkskul;
