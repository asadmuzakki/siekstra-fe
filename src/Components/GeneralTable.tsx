import { FiEdit } from "react-icons/fi";
import { CiTrash } from "react-icons/ci";
import { formatToHourMinute } from "../Utils/formatTime";

type TableType = {
  label: string[];
  keys: string[];
  data: any[];
  fromComponent?: string;
  action?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  startNumber?: number; // <--- tambahan baru
  renderCell?: (row: any, key: string) => React.ReactNode;
};

const GeneralTable: React.FC<TableType> = ({
  label,
  keys,
  data,
  action,
  onEdit,
  onDelete,
  fromComponent,
  startNumber = 0,
}) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white overflow-hidden">
        <thead className="text-gray-600 text-sm uppercase text-left">
          <tr>
            <th className="px-4 py-3 border-b border-gray-500 text-center">
              No
            </th>
            {label.map((label, index) => (
              <th
                key={index}
                className="px-4 py-3 border-b border-gray-500 text-center truncate"
              >
                {label}
              </th>
            ))}
            {action && (
              <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-50">
              {/* Kolom Nomor */}
              <td className="px-4 py-3 text-center">
                {(startNumber || 0) + rowIndex + 1}
              </td>
              {fromComponent === "GeneralComponent" &&
                keys.map((key, index) => (
                  <td key={index} className="px-4 py-3 text-center truncate">
                    {key === "pendaftarans"
                      ? row.pendaftarans?.length <= 0
                        ? "-"
                        : row.pendaftarans?.map((item: any) => {
                            return item.ekskul.nama_ekskul || "-";
                          }) || "-"
                      : row[key] || "-"}
                  </td>
                ))}

              {fromComponent === "DetailPenilaianTutor" &&
                keys.map((key, index) => (
                  <td key={index} className="px-4 py-3 text-center truncate">
                    {key === "siswa"
                      ? row.siswa?.nama || "-"
                      : key === "kelas"
                      ? row.siswa?.kelas || "-"
                      : row[key] || 0}
                  </td>
                ))}
              {fromComponent === "RiwayatAbsensi" &&
                keys.map((key, index) => (
                  <td key={index} className="px-4 py-3 text-center truncate">
                    {key === "agenda" && !row[key] ? "-" : row[key] || 0}
                  </td>
                ))}

              {fromComponent === "TutorPresensi" &&
                keys.map((key, index) => (
                  <td key={index} className="px-4 py-3 text-center truncate">
                    {key === "ekskul"
                      ? row.ekskul?.nama_ekskul || "-"
                      : key === "created_at"
                      ? formatToHourMinute(row.created_at)
                      : row[key] || "-"}
                  </td>
                ))}
              {fromComponent === "RiwayatPendaftaran" &&
                keys.map((key, index) => (
                  <td key={index} className="px-4 py-3 text-center truncate">
                    {key === "ekskul"
                      ? row.ekskul?.nama_ekskul || "-"
                      : key === "siswa"
                      ? row.siswa?.nama || "-"
                      : key === "tanggal_pendaftaran"
                      ? row.tanggal_pendaftaran || "-"
                      : row[key] || "-"}
                  </td>
                ))}

              {/* Kolom Aksi */}
              {action && (
                <td className=" text-center space-x-2 truncate">
                  {fromComponent === "RiwayatPendaftaran" ? (
                    <button
                      onClick={() => onEdit?.(row)}
                      className="bg-blue-100  text-blue-700 p-2 rounded cursor-pointer"
                    >
                      <FiEdit className="text-lg" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onEdit?.(row.id)}
                      className="bg-blue-100  text-blue-700 p-2 rounded cursor-pointer"
                    >
                      <FiEdit className="text-lg" />
                    </button>
                  )}
                  
                  {fromComponent !== "DetailPenilaianTutor" && (
                    <button
                      onClick={() => onDelete?.(row.id)}
                      className="bg-red-100  text-red-700 p-2 rounded cursor-pointer"
                    >
                      <CiTrash className="text-lg" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralTable;
