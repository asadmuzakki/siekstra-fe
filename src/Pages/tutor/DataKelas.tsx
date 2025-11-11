import { useParams, useNavigate } from "react-router-dom";
import * as Get from "../../Hooks/useGet";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const RiwayatKelas = () => {
  const { id } = useParams(); // id ekskul
  const navigate = useNavigate();
  const { data_kelas } = Get.useDataKelas(id ?? "");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebar="tutor" />

      <div className="flex-1 flex flex-col w-full bg-blue-50">
        <Header />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">
            Daftar Kelas — {sessionStorage.getItem("nama_ekskul")}
          </h1>

          {!data_kelas ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white shadow p-4 rounded-md">
              <table className="min-w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2 border-b">No</th>
                    <th className="py-2 border-b">Nama Kelas</th>
                    <th className="py-2 border-b">Tahun Ajaran</th>
                    <th className="py-2 border-b">Periode</th>
                    <th className="py-2 border-b text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data_kelas.data.map((kelas:any, index:number) => (
                    <tr key={kelas.id} className="hover:bg-gray-50">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{kelas.nama_kelas}</td>
                      <td className="py-2">{kelas.tahun_ajaran}</td>
                      <td className="py-2">{kelas.periode}</td>
                      <td className="py-2 text-center">

                        {/* ✅ TOMBOL ABSEN */}
                        <button
                          onClick={() =>
                            navigate(`absen/${kelas.id}`, {
                              state: { 
                                ekskul_id: id,
                                kelas_id: kelas.id,
                                nama_kelas: kelas.nama_kelas,
                              }
                            })
                          }
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          Absen
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiwayatKelas;
