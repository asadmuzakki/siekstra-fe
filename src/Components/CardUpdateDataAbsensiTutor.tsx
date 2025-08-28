import { useEffect, useState } from "react";
import { useUpdateDataAbsensiTutor } from "../Hooks/Admin/usePatch";
import {
  useGetDataAbsensiTutor,
  useGetDataTutorAdmin,
} from "../Hooks/Admin/useGet";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  idAbsensiTutor: string;
};

const CardUpdateDataAbsensiTutor = ({
  setShow,
  setSuccessUpdate,
  setErrorUpdate,
  idAbsensiTutor,
}: Props) => {
  const [tutorId, setTutorId] = useState<number | null>(null);
  const [ekskulId, setEkskulId] = useState<number | null>(null);
  const [tanggal, setTanggal] = useState("");
  const [status, setStatus] = useState<"Hadir" | "Alpha" | "Izin" | "Sakit">(
    "Hadir"
  );
  const [keterangan, setKeterangan] = useState("");

  const { data: dataTutor } = useGetDataTutorAdmin(); // tutor sudah punya ekskul di response
  const { data: absensiData } = useGetDataAbsensiTutor();
  const { onSubmit, success, error, isLoading } = useUpdateDataAbsensiTutor(
    Number(idAbsensiTutor)
  );

  // Prefill data absensi
  useEffect(() => {
    if (absensiData) {
      const item = absensiData.data.find(
        (a: any) => a.id === Number(idAbsensiTutor)
      );
      if (item) {
        setTutorId(item.tutor_id);
        setEkskulId(item.ekskul_id);
        setTanggal(item.tanggal);
        setStatus(item.status);
        setKeterangan(item.keterangan || "");
      }
    }
  }, [absensiData, idAbsensiTutor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorId || !ekskulId || !tanggal) return;

    onSubmit({
      tutor_id: tutorId,
      ekskul_id: ekskulId,
      tanggal,
      status,
      keterangan,
    });
  };

  useEffect(() => {
    if (success) {
      setSuccessUpdate(true);
      setShow(false);
    }
    if (error) {
      setErrorUpdate(true);
      setShow(false);
    }
  }, [success, error]);

  // Ambil tutor yang dipilih untuk filter ekskul
  const selectedTutor = dataTutor?.data.find((t: any) => t.id === tutorId);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-sembold mb-4 text-gray-700">Edit Data Absensi Tutor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tutor */}
          <select
            value={tutorId ?? ""}
            onChange={(e) => {
              setTutorId(Number(e.target.value));
              setEkskulId(null); // reset ekskul saat ganti tutor
            }}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Pilih Tutor</option>
            {dataTutor?.data.map((tutor: any) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </select>

          {/* Ekskul */}
          <select
            value={ekskulId ?? ""}
            onChange={(e) => setEkskulId(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
            disabled={!tutorId}
          >
            <option value="">Pilih Ekskul</option>
            {selectedTutor?.ekskuls?.map((ekskul: any) => (
              <option key={ekskul.id} value={ekskul.id}>
                {ekskul.nama_ekskul}
              </option>
            ))}
          </select>

          {/* Tanggal */}
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Hadir">Hadir</option>
            <option value="Alpha">Alpha</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
          </select>

          {/* Keterangan */}
          <textarea
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="Keterangan (opsional)"
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="px-4 py-2 bg-red-300 rounded hover:bg-red-400 text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading ? "Menyimpan..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardUpdateDataAbsensiTutor;
