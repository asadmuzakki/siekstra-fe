import { FaChild, FaUsers } from "react-icons/fa6";
import { RiStackLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { MdAccessTime, MdInsertChartOutlined, MdOutlineDateRange } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { GrScorecard } from "react-icons/gr";
export type SidebarMenu = {
  icon: React.ReactNode;
  label: string;
  path: string;
};
export const waliMurid: SidebarMenu[] = [
  {
    icon: <FaChild />,
    label: "Anak",
    path: "/dashboard-anak",
  },
  {
    icon: <RiStackLine />,
    label: "Ekstrakurikuler",
    path: "/ekstrakurikuler",
  },
];

export const admin: SidebarMenu[] = [
  {
    icon: <AiOutlineHome />,
    label: "Dashboard",
    path: "/dashboard-admin",
  },
  {
    icon: <MdOutlineDateRange />,
    label: "Absensi",
    path: "/absensi",
  },
  {
    icon: <FaUsers />,
    label: "Data Wali Murid",
    path: "/data-wali-murid",
  },
  {
    icon: <PiStudent />,
    label: "Data Siswa",
    path: "/data-siswa",
  },
  {
    icon: <GiTeacher />,
    label: "Data Tutor",
    path: "/data-tutor",
  },
  {
    icon: <RiStackLine />,
    label: "Ekstrakurikuler",
    path: "/admin-ekstrakurikuler",
  },
  {
    icon: <GrScorecard />,
    label: "Rekapitulasi",
    path: "/rekapitulasi",
  },
  {
    icon: <MdInsertChartOutlined />,
    label: "Grafik Pendaftaran",
    path: "/grafik-pendaftaran",
  },
];

export const tutor: SidebarMenu[] = [
  {
    icon: <PiStudent />,
    label: "Siswa",
    path: "/tutor-siswa",
  },
  {
    icon: <MdOutlineDateRange />,
    label: "Absensi",
    path: "/tutor-absensi",
  },
  {
    icon: <MdAccessTime />,
    label: "Kegiatan",
    path: "/tutor-kegiatan",
  },
];
