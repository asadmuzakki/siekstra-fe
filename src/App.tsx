import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import DashboardWaliMurid from "./Pages/WaliMurid/Dashboard";
import EkstraKurikuler from "./Pages/WaliMurid/Ekstrakurikuler";
import DashboardAdmin from "./Pages/admin/DashboardAdmin";
import DataSiswa from "./Pages/admin/DataSiswa";
import DataRekapitulasi from "./Pages/admin/DataRekapitulasi.";

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
import Profile from "./Pages/profile/Profile";
import DetailRekapPenilaian from "./Pages/admin/DetailRekapPenilaian";
import DetailRekapAbsensi from "./Pages/admin/DetailRekapAbsensi";
import RiwayatPendaftaran from "./Pages/admin/RiwayatPendaftaran";
import GrafikPage from "./Pages/admin/GrafikPendaftaran";

import Presensi from "./Pages/WaliMurid/Presensi";
import Nilai from "./Pages/WaliMurid/Nilai";
import KegiatanSiswa from "./Pages/WaliMurid/Kegiatan";
import DashboardEkskul from "./Pages/WaliMurid/DashboardEkskul";

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

      <Route
        path="/rekapitulasi"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DataRekapitulasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rekapitulasi/penilaian"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DetailRekapPenilaian />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rekapitulasi/absensi"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DetailRekapAbsensi />
          </ProtectedRoute>
        }
      />

      <Route
        path="/grafik-pendaftaran"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <GrafikPage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/riwayat-pendaftaran"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <RiwayatPendaftaran />
          </ProtectedRoute>
        }
      />
      
      {/* admin */}

      {/* Orang Tua */}
      <Route
        path="/dashboard-anak"
        element={
          <ProtectedRoute allowedRoles={["wali_murid"]}>
            <DashboardWaliMurid />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ekstrakurikuler"
        element={
          <ProtectedRoute allowedRoles={["wali_murid"]}>
            <EkstraKurikuler />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard-anak/presensi/:id"
        element={
          <ProtectedRoute allowedRoles={["wali_murid"]}>
            <Presensi />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard-anak/nilai/:id"
        element={
          <ProtectedRoute allowedRoles={["wali_murid"]}>
            <Nilai />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard-anak/wali-kegiatan/:id"
        element={
          <ProtectedRoute allowedRoles={["wali_murid"]}>
            <KegiatanSiswa />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard-ekskul"
        element={
          <ProtectedRoute allowedRoles={["wali_murid"]}>
            <DashboardEkskul />
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/tutor-absensi"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <TutorPresensi />
          </ProtectedRoute>
        }
      />

      {/* Tutor */}

      {/* Test */}

      {/* Test */}

      <Route
        path="/profile/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/tutor"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/wali"
        element={
          <ProtectedRoute allowedRoles={["wali_murid"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
