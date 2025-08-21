import { useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import GeneralTable from "../../Components/GeneralTable";
import { useGetRekapAbsensi } from "../../Hooks/Admin/useGet";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DetailRekapAbsensi = () => {
  const label = ["Siswa", "Ekskul", "Kelas", "Status", "Keterangan", "Tanggal"];
  const keys = ["siswa", "ekskul", "kelas", "status", "ket", "tanggal"];

  // filter & sort state
  const [tahunFilter, setTahunFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // fetch data
  const { data, isLoading, isError } = useGetRekapAbsensi(
    tahunFilter || undefined,
    sortConfig?.key,
    sortConfig?.direction
  );

  // mapping data API ke format table
  const mappedData =
    data?.data?.map((item: any) => ({
      tanggal: item.tanggal,
      ekskul: item.nama_ekskul ?? "-",
      siswa: item.nama_siswa,
      kelas: item.kelas,
      status: item.status,
      ket: item.keterangan ?? "-",
    })) || [];

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const totalPages = Math.ceil(mappedData.length / pageSize) || 1;
  const paginatedData = mappedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // sort handler
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setPage(1);
  };

  // handler export excel
  const exportToExcel = () => {
    const exportData = mappedData.map((row: any, index: number) => ({
      No: index + 1,
      Siswa: row.siswa,
      Ekskul: row.ekskul,
      Kelas: row.kelas,
      Status: row.status,
      Keterangan: row.ket,
      Tanggal: row.tanggal,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Absensi");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, `rekap_absensi_${tahunFilter || "all"}.xlsx`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebar="admin" />
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <Header />

        <div className="p-6 overflow-scroll scrollbar-hide">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Detail Rekap Absensi
          </h1>

          {/* Filter Tahun + Export */}
          <div className="flex gap-4 mb-4">
            <select
              value={tahunFilter}
              onChange={(e) => {
                setTahunFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded-md px-3 py-2"
            >
              <option value="">Semua Tahun</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>

            {/* Tombol Export */}
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={mappedData.length === 0}
            >
              Export Excel
            </button>
          </div>

          {/* Tombol Sort */}
          <div className="flex gap-4 mb-3">
            <button
              onClick={() => requestSort("kelas")}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Sort by Kelas{" "}
              {sortConfig?.key === "kelas"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </button>
            <button
              onClick={() => requestSort("ekskul")}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              Sort by Ekskul{" "}
              {sortConfig?.key === "ekskul"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : isError ? (
              <p className="text-red-500">Gagal memuat data</p>
            ) : (
              <GeneralTable
                label={label}
                keys={keys}
                data={paginatedData}
                fromComponent="GeneralComponent"
                action={false}
                startNumber={(page - 1) * pageSize}
              />
            )}

            {/* Pagination */}
            {!isLoading && mappedData.length > 0 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={`px-4 py-2 rounded-md ${
                    page === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>

                <span className="text-gray-600">
                  Halaman {page} dari {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className={`px-4 py-2 rounded-md ${
                    page === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRekapAbsensi;
