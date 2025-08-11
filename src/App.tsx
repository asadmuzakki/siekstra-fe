import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import DashboardWaliMurid from "./Pages/WaliMurid/Dashboard";
import EkstraKurikuler from "./Pages/WaliMurid/Ekstrakurikuler";
import DashboardAdmin from "./Pages/admin/DashboardAdmin";
import DataSiswa from "./Pages/admin/DataSiswa";

import Kegiatan from "./Pages/tutor/Kegiatan";

import KegiatanEkskul from "./Pages/tutor/KegiatanEkskul";
import Siswa from "./Pages/tutor/Siswa";

import AbsensiEkskul from "./Pages/tutor/AbsensiEkskul";
import RiwayatAbsensiEkskul from "./Pages/tutor/RiwayatAbsensiEkskul";
import UpdateAbsensiEkskul from "./Pages/tutor/UpdateAbsensiEkskul";
import RiwayatKegiatan from "./Pages/tutor/RiwayatKegiatan";
import UpdateAbsensiKegiatan from "./Pages/tutor/UpdateAbsensiKegiatan";

import TutorPresensi from "./Pages/tutor/TutorPresensi";
import TutorPenilaian from "./Pages/tutor/TotorPenilaian";
import DetailPenilaianTutor from "./Pages/tutor/DetailPenilaianTutor";
import TambahPenilaianTutor from "./Pages/tutor/TambahPenilaianTutor";
import ProtectedRoute from "./Auth/ProtectedRoute";
import UpdatePenilaianTutor from "./Pages/tutor/UpdatePenilaianTutor";
import DataWaliMurid from "./Pages/admin/DataWaliMurid";
import DataTutor from "./Pages/admin/DataTutor";
import DataEkskul from "./Pages/admin/DataEkskul";
import DataAbsensiTutor from "./Pages/admin/DataAbsensiTutor";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* admin */}
      <Route
        path="/dashboard-admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/data-siswa"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DataSiswa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/data-wali-murid"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DataWaliMurid />
          </ProtectedRoute>
        }
      />
      <Route
        path="/data-tutor"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DataTutor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-ekstrakurikuler"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DataEkskul />
          </ProtectedRoute>
        }
      />
      <Route
        path="/absensi"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DataAbsensiTutor />
          </ProtectedRoute>
        }
      />
      {/* admin */}

      {/* Orang Tua */}
      <Route path="/dashboard-anak" element={<DashboardWaliMurid />} />
      <Route path="/ekstrakurikuler" element={<EkstraKurikuler />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      {/* Orang Tua */}

      {/* Tutor */}

      <Route
        path="/tutor-kegiatan"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <Kegiatan />
          </ProtectedRoute>
        }
      />
      <Route path="/tutor-kegiatan/riwayat/:id" element={<RiwayatKegiatan />} />
      <Route
        path="/tutor-kegiatan/riwayat/kegiatan/:id"
        element={<KegiatanEkskul />}
      />
      <Route
        path="/tutor-kegiatan/riwayat/update-absensi/:absensi_id/:ekskul_id"
        element={<UpdateAbsensiKegiatan />}
      />

      <Route
        path="/tutor-siswa"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <Siswa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tutor-siswa/riwayat/:id"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <RiwayatAbsensiEkskul />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tutor-siswa/riwayat/absensi/:id"
        element={<AbsensiEkskul />}
      />
      <Route
        path="/tutor-siswa/riwayat/update-absensi/:absensi_id/:ekskul_id"
        element={<UpdateAbsensiEkskul />}
      />
      <Route path="/tutor-siswa/penilaian/:id" element={<TutorPenilaian />} />
      <Route
        path="/tutor-siswa/penilaian/tambah-penilaian/:id"
        element={<TambahPenilaianTutor />}
      />
      <Route
        path="/tutor-siswa/penilaian/update-penilaian/:id/:ekskul_id"
        element={<UpdatePenilaianTutor />}
      />
      <Route
        path="/tutor-siswa/penilaian/detail/:id"
        element={<DetailPenilaianTutor />}
      />

      <Route path="/tutor-absensi" element={<TutorPresensi />} />

      {/* Tutor */}

      {/* Test */}

      {/* Test */}
    </Routes>
  );
};

export default App;
