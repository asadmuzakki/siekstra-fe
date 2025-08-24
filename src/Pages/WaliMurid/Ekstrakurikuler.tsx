import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import {
  useGetEkskulForWali,
  useGetDataAnak,
} from "../../Hooks/WaliMurid/useGet";
import { useEffect } from "react";
import { useCreatePendaftaranEkskul } from "../../Hooks/WaliMurid/usePost";
import Popup from "../../Components/Popup"; // ✅ import popup

const EkstraKurikuler = () => {
  const { data, isLoading, isError, error } = useGetEkskulForWali();
  const { data: dataAnak } = useGetDataAnak();

  // hook daftar ekskul
  const {
    onSubmit,
    isLoading: isLoadingDaftar,
    success,
    error: errorDaftar,
  } = useCreatePendaftaranEkskul();

  // debug log
  useEffect(() => {
    console.log("📦 Data Ekskul Wali Murid:", data);
    console.log("📦 Data Anak Wali Murid:", dataAnak);
  }, [data, dataAnak]);

  const handleDaftar = (ekskulId: number, siswaId: number) => {
    onSubmit({ ekskul_id: ekskulId, siswa_id: siswaId });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="wali_murid" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>

        <div className="overflow-scroll scrollbar-hide w-full">
          <div className="flex-1 m-4 scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Ekstrakurikuler
              </p>
            </div>

            <div className="p-5 bg-white shadow-md rounded-md">
              <div className="flex justify-start items-center w-full py-5 text-gray-600 text-lg font-semibold">
                Daftar Ekstrakurikuler
              </div>
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Gagal memuat: {error?.message}</p>
              ) : data?.data && data.data.length > 0 ? (
                <div>
                  {data.data.map((anak: any, idx: number) => {
                    // ✅ cari siswa di dataAnak agar dapat id siswa
                    const siswa = dataAnak?.data?.find(
                      (a: any) => a.nama === anak.siswa
                    );

                    return (
                      <div key={`${anak.siswa}-${idx}`} className="mb-10">
                        {/* Nama siswa */}
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                          {anak.siswa} ({anak.kelas})
                        </h2>

                        {/* Grid daftar ekskul */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {anak.ekskul.map((ekskul: any) => (
                            <div
                              key={`${anak.siswa}-${ekskul.id}`}
                              className="bg-white border border-gray-300 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                              {/* Gambar */}
                              <div className="p-6">
                                <div className="w-full h-64 rounded-md">
                                  <img
                                    src={
                                      ekskul.foto_url ??
                                      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&auto=format&fit=crop&q=60"
                                    }
                                    alt={ekskul.nama_ekskul}
                                    className="w-full h-64 object-cover rounded-xl"
                                  />
                                </div>
                              </div>

                              {/* Konten */}
                              <div className="p-6 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                  {ekskul.nama_ekskul}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                  {ekskul.deskripsi}
                                </p>
                                <p className="text-xs text-gray-500 mb-2">
                                  <span className="font-semibold">Jadwal:</span>{" "}
                                  {ekskul.jadwal} @ {ekskul.tempat}
                                </p>

                                {/* Tombol daftar / terdaftar */}
                                {ekskul.is_registered ? (
                                  <button
                                    disabled
                                    className="bg-gray-400 text-white px-10 py-1 rounded-full cursor-not-allowed"
                                  >
                                    Terdaftar
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      siswa && handleDaftar(ekskul.id, siswa.id)
                                    }
                                    disabled={isLoadingDaftar}
                                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-10 py-1 rounded-full transition disabled:bg-gray-400"
                                  >
                                    {isLoadingDaftar
                                      ? "Mendaftar..."
                                      : "Daftar"}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">Belum ada data ekskul</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Popup
        label="Berhasil!"
        message="Pendaftaran ekskul berhasil dilakukan."
        isSuccess={true}
        stateConcition={success}
        stateName="post"
        reload={true}
      />

      <Popup
        label="Gagal!"
        message="Pendaftaran ekskul gagal. Silakan coba lagi."
        isSuccess={false}
        stateConcition={errorDaftar}
        stateName="post"
      />
    </div>
  );
};

export default EkstraKurikuler;
