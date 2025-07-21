import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const EkstraKurikuler = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="WALI_MURID" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        <div className="overflow-scroll scrollbar-hide  w-full">
          <div className="flex-1 m-4  scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Ekstrakurikuler
              </p>
            </div>
            <div className="p-5 bg-white shadow-md rounded-md">
              <div className="flex justify-start items-center w-full py-5 text-gray-600 ">
                Daftar Ekstrakurikuler
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-300 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 "
                  >
                    {/* Gambar */}
                    <div className="p-6">

                    <div className=" w-full h-64 rounded-md">
                      <img
                        src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb3RiYWxsfGVufDB8fDB8fHww"
                        alt="Ekskul"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>
                    </div>

                    {/* Konten */}
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Ekstrakurikuler Futsal
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Bergabung dalam ekskul futsal untuk melatih
                        keterampilan, kekompakan, dan sportivitas bersama
                        teman-teman.
                      </p>
                      <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-10 py-1 rounded-full transition">
                        Daftar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EkstraKurikuler;
