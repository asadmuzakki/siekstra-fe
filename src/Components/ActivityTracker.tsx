import React, { useState } from "react";

interface ActivityEntry {
  id: number;
  hadir: boolean;
  sakit: boolean;
  izin: boolean;
  alpa: boolean;
  nama: string;
  keterangan: string;
}

const ActivityTracker: React.FC = () => {
  const [formData, setFormData] = useState({
    namaKegiatan: "Matasar",
    tanggal: "19-02-2025",
    kategori: "Lomba",
    tingkat: "Provinsi",
    linkDokumentasi: "",
  });

  const [entries, setEntries] = useState<ActivityEntry[]>([
    {
      id: 1,
      hadir: true,
      sakit: false,
      izin: false,
      alpa: false,
      nama: "Asad Muzakki",
      keterangan: "",
    },
    {
      id: 2,
      hadir: false,
      sakit: true,
      izin: false,
      alpa: false,
      nama: "Asad Muzakki",
      keterangan: "",
    },
    {
      id: 3,
      hadir: false,
      sakit: false,
      izin: true,
      alpa: false,
      nama: "Asad Muzakki",
      keterangan: "",
    },
    {
      id: 4,
      hadir: false,
      sakit: false,
      izin: false,
      alpa: true,
      nama: "Asad Muzakki",
      keterangan: "",
    },
    {
      id: 5,
      hadir: false,
      sakit: false,
      izin: false,
      alpa: false,
      nama: "Asad Muzakki",
      keterangan: "",
    },
    {
      id: 6,
      hadir: false,
      sakit: false,
      izin: false,
      alpa: false,
      nama: "Asad Muzakki",
      keterangan: "",
    },
  ]);

  const handleStatusChange = (
    entryId: number,
    status: "hadir" | "sakit" | "izin" | "alpa"
  ) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === entryId) {
          return {
            ...entry,
            hadir: status === "hadir",
            sakit: status === "sakit",
            izin: status === "izin",
            alpa: status === "alpa",
          };
        }
        return entry;
      })
    );
  };

  const handleKeteranganChange = (entryId: number, value: string) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === entryId) {
          return { ...entry, keterangan: value };
        }
        return entry;
      })
    );
  };

  const StatusIndicator: React.FC<{
    isActive: boolean;
    color: string;
    onClick: () => void;
  }> = ({ isActive, color, onClick }) => (
    <button
      onClick={onClick}
      className={`w-4 h-4 rounded-full border-2 transition-all ${
        isActive
          ? `${color} border-gray-300`
          : "bg-gray-200 border-gray-300 hover:bg-gray-300"
      }`}
    />
  );

  return (
    <div className=" mx-auto bg-white">
      {/* Form Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Kegiatan :
          </label>
          <input
            type="text"
            value={formData.namaKegiatan}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, namaKegiatan: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal :
          </label>
          <input
            type="text"
            value={formData.tanggal}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tanggal: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori :
          </label>
          <select
            value={formData.kategori}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, kategori: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Lomba">Lomba</option>
            <option value="Pelatihan">Pelatihan</option>
            <option value="Seminar">Seminar</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tingkat :
          </label>
          <select
            value={formData.tingkat}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tingkat: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Provinsi">Provinsi</option>
            <option value="Nasional">Nasional</option>
            <option value="Regional">Regional</option>
            <option value="Internasional">Internasional</option>
          </select>
        </div>
      </div>

      {/* Link Dokumentasi */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Link Dokumentasi :
        </label>
        <textarea
          value={formData.linkDokumentasi}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              linkDokumentasi: e.target.value,
            }))
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan link dokumentasi..."
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-3 px-2 font-medium text-gray-700">
                No
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Hadir
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Sakit
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Izin
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Alpa
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Nama
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr
                key={entry.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-2 text-gray-600">{index + 1}</td>
                <td className="py-3 px-4">
                  <StatusIndicator
                    isActive={entry.hadir}
                    color="bg-green-500"
                    onClick={() => handleStatusChange(entry.id, "hadir")}
                  />
                </td>
                <td className="py-3 px-4">
                  <StatusIndicator
                    isActive={entry.sakit}
                    color="bg-blue-500"
                    onClick={() => handleStatusChange(entry.id, "sakit")}
                  />
                </td>
                <td className="py-3 px-4">
                  <StatusIndicator
                    isActive={entry.izin}
                    color="bg-yellow-500"
                    onClick={() => handleStatusChange(entry.id, "izin")}
                  />
                </td>
                <td className="py-3 px-4">
                  <StatusIndicator
                    isActive={entry.alpa}
                    color="bg-red-500"
                    onClick={() => handleStatusChange(entry.id, "alpa")}
                  />
                </td>
                <td className="py-3 px-4 text-blue-600">{entry.nama}</td>
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={entry.keterangan}
                    onChange={(e) =>
                      handleKeteranganChange(entry.id, e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Keterangan..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-sm text-gray-500">Showing 1 of 1 entries</div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default ActivityTracker;
