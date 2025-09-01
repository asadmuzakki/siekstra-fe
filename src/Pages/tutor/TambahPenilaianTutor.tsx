/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import * as Get from "../../Hooks/useGet";
import * as Post from "../../Hooks/usePost";

import { useParams } from "react-router-dom";
import type { NilaiEkskulModelType } from "../../Models/ekskul.model";
import {
  calculateIndexNilai,
  calculateNilai,
} from "../../Utils/calculateNilai";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Popup from "../../Components/Popup";
import { useGlobalContext } from "../../Context/Context";

const TambahPenilaianTutor = () => {
  const { id } = useParams();
  const { state } = useGlobalContext();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    success,
    error,

    isLoading: isLoading_post,
  } = Post.useAddNilaiEkskulTutor();
  const { data, isLoading } = Get.useGetSiswa1(String(id));
  const [kehadiran, setKehadiran] = useState<string[]>([]);
  const [keaktifan, setKeaktifan] = useState<string[]>([]);
  const [praktik, setPraktik] = useState<string[]>([]);

  // const editdelete = (id: string) => {
  //   alert(id);
  // };

  const handleSubmitForm = (data: NilaiEkskulModelType) => {
    console.log(data);
    onSubmit(data);
  };
  useEffect(() => {
    console.log(data?.data);
    if (data?.data) {
      data?.data?.forEach((item: any, index: number) => {
        setValue(`penilaians.${index}.siswa_id`, item.siswa.id);
      });
    }
  }, [data, setValue]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="tutor" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>

        {success && (
          <Popup
            label="Create Berhasil"
            message="Create Berhasil"
            navigateTo={`/tutor-siswa/penilaian/${id}`}
            isSuccess={true}
            stateConcition={state.post}
            stateName="post"
          />
        )}
        {error && (
          <Popup
            label="Create Gagal"
            message="Create Gagal"
            navigateTo=""
            isSuccess={false}
            stateConcition={state.post}
            stateName="post"
          />
        )}

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
                  Tambah Nilai Siswa
                </p>
              </div>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="p-5 bg-white shadow-md rounded-md">
                  <div className="flex w-full justify-end">
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal :
                      </label>
                      <input
                        type="date"
                        {...register("tanggal")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div>
                        <p className="text-xs text-red-500 mt-1">
                          {errors ? errors.tanggal?.message : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white overflow-hidden">
                      <thead className="text-gray-600 text-sm uppercase text-left">
                        <tr>
                          <th className="px-4 py-3 border-b border-gray-500 text-center">
                            No
                          </th>
                          <th className="px-4 py-3 border-b border-gray-500 text-center">
                            Nama
                          </th>
                          <th className="px-4 py-3 border-b border-gray-500 text-center">
                            Kelas
                          </th>
                          <th className="px-4 py-3 border-b border-gray-500 text-center">
                            Kehadiran
                          </th>
                          <th className="px-4 py-3 border-b border-gray-500 text-center">
                            Keaktifan
                          </th>
                          <th className="px-4 py-3 border-b border-gray-500 text-center">
                            Praktik
                          </th>
                          <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                            Nilai Akhir
                          </th>
                          <th className="px-4 py-3 border-b border-gray-500 text-center truncate">
                            Index Nilai
                          </th>
                          <th className="px-4 py-3 border-b border-gray-500 text-center">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-gray-700">
                        {data?.data.map((item: any, index: number) => (
                          <tr className="hover:bg-gray-50">
                            {/* Kolom Nomor */}
                            <td className="px-4 py-3 text-center">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 text-center truncate">
                              <input
                                className=" hidden"
                                disabled
                                {...register(`penilaians.${index}.siswa_id`)}
                                type="number"
                              />
                              {item.siswa.nama}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {item.siswa.kelas}
                            </td>

                            <td className="px-4 py-3 text-center">
                              <input
                                {...register(`penilaians.${index}.kehadiran`)}
                                onChange={(e) => {
                                  const newVal = [...kehadiran];
                                  newVal[index] = e.target.value;
                                  setKehadiran(newVal);
                                }}
                                className="border rounded px-2 py-1 w-30  outline-none"
                                type="number"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                {...register(`penilaians.${index}.keaktifan`)}
                                onChange={(e) => {
                                  const newVal = [...keaktifan];
                                  newVal[index] = e.target.value;
                                  setKeaktifan(newVal);
                                }}
                                className="border rounded px-2 py-1 w-30   outline-none"
                                type="number"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                {...register(`penilaians.${index}.praktik`)}
                                onChange={(e) => {
                                  const newVal = [...praktik];
                                  newVal[index] = e.target.value;
                                  setPraktik(newVal);
                                }}
                                className="border rounded px-2 py-1 w-30   outline-none"
                                type="number"
                              />
                            </td>
                            <td className="px-4 py-3 text-center w-15">
                              {calculateNilai(
                                kehadiran[index] || "",
                                keaktifan[index] || "",
                                praktik[index] || ""
                              )}
                            </td>
                            <td className="px-4 py-3 text-center w-15">
                              {calculateIndexNilai(
                                String(
                                  calculateNilai(
                                    kehadiran[index] || "",
                                    keaktifan[index] || "",
                                    praktik[index] || ""
                                  )
                                )
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                className="border rounded px-2 py-1  outline-none"
                                type="text"
                              />
                            </td>

                            {/* Kolom Aksi */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full flex justify-center items-center mt-10">
                    <button
                      onClick={() => {
                        setValue("ekskul_id", Number(id));
                      }}
                      type="submit"
                      className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                    >
                      <p>Submit</p>
                      {isLoading_post && <LoadingSpinner />}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TambahPenilaianTutor;
