import { useState } from "react";
import ExtracurricularBarChart from "../../Components/ExtracurricularBarChart";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";

const GrafikPage = () => {
  const [tahun, setTahun] = useState(new Date().getFullYear());

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="admin" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        {/* Header */}
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>

        {/* Content area */}
        <div className="overflow-scroll scrollbar-hide w-full">
          <div className="flex-1 m-4 scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Grafik Pendaftaran Ekstrakurikuler
              </p>
            </div>

            {/* Grafik Pendaftaran Ekstrakurikuler */}
            <div className="p-5 bg-white shadow-md rounded-md mb-10">
              <div className="flex justify-between items-center w-full mb-10">
                <p className="text-blue-500 font-semibold">
                  Grafik Pendaftaran Ekstrakurikuler
                </p>
                <select
                  value={tahun}
                  onChange={(e) => setTahun(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-7 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <ExtracurricularBarChart type="pendaftaran" tahun={tahun} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrafikPage;
