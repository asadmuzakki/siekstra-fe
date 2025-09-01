/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import * as Get from "../../Hooks/useGet";

import {  useParams } from "react-router-dom";

const DetailPenilaianTutor = () => {
  const { id } = useParams();
 

  const { data, isLoading } = Get.useGetNilaiSiswaTutorById(String(id));

  // const editdelete = (id: string) => {
  //   alert(id);
  // };
  useEffect(() => {
    console.log(data);
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="tutor" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>

        {/* {isLoading_delete && (
          <div className="fixed inset-0 w-full h-screen bg-black opacity-50 z-50"></div>
        )} */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="overflow-scroll scrollbar-hide  w-full">
            <div className="flex-1 m-4  scrollbar-hide">
              <div className="w-full flex justify-between mb-6">
                <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                  Siswa
                </p>
              </div>
              <div className="p-5 bg-white shadow-md rounded-md">
                <div className="flex justify-start items-center w-full py-5 text-gray-600 ">
                  Riwayat Presensi
                </div>

                <GeneralTable
                  fromComponent="DetailPenilaianTutor"
                  label={[
                    "Nama",
                    "Kelas",
                    "Kehadiran",
                    "Keaktifan",
                    "Praktik",
                    "Nilai Akhir",
                    "Index Nilai",
                  ]}
                  data={(data ? data?.data?.details : []) as any[]}
                  action={false}
                  keys={[
                    "siswa",
                    "kelas",
                    "kehadiran",
                    "keaktifan",
                    "praktik",
                    "nilai_akhir",
                    "index_nilai",
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPenilaianTutor;
