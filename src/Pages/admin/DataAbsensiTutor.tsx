import { useEffect, useState } from "react";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetDataAbsensiTutor } from "../../Hooks/Admin/useGet";
import Popup from "../../Components/Popup";
import { useDeleteDataAbsensiTutorById } from "../../Hooks/Admin/useDelete";
import CardCreateDataAbsensiTutor from "../../Components/CardCreateDataAbsensiTutor";
import { useGlobalContext } from "../../Context/Context";

const DataAbsensiTutor = () => {
   const { state } = useGlobalContext();
   const { data, isLoading } = useGetDataAbsensiTutor();
   const { onDelete, isLoadingDelete, errorDelete, successDelete } = useDeleteDataAbsensiTutorById();
   const [showPopup, setShowPopup] = useState(false);
   const [successCreate, setSuccessCreate] = useState(false);
   const [errorCreate, setErrorCreate] = useState(false);
   const [isEdit, setIsEdit] = useState(false);
   const [idAbsensiTutor, setIdAbsensiTutor] = useState<string | null>(null);
   const [successUpdate, setSuccessUpdate] = useState(false);
   const [errorUpdate, setErrorUpdate] = useState(false);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const formattedData = data?.data.map((item: any) => ({
      ...item,
      waktu: new Date(item.tanggal).toLocaleDateString("id-ID"),
      nama_tutor: item.tutor.name || "Tidak Tersedia",
      nama_ekskul: item.ekskul.nama_ekskul || "Tidak Tersedia",
   }));
   const handleDeleteDataAbsensiTutor = (id: string) => {
      onDelete(id);
   };

   const handleEditDataAbsensiTutor = (id: string) => {
      setIdAbsensiTutor(id);
      setIsEdit(true);
      setShowPopup(true);
   };

   useEffect(() => {
      console.log(data);
   }, [data]);

   const idAbsensiTutorString = idAbsensiTutor || undefined; // Menyesuaikan tipe untuk idAbsensiTutor

   return (
      <div className="flex h-screen overflow-hidden">
         <div onClick={(e) => e.stopPropagation()}>
            <Sidebar sidebar="ADMIN" />
         </div>
         <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
            <div onClick={(e) => e.stopPropagation()}>
               <Header />
            </div>
            {isLoadingDelete && (
               <div className="fixed inset-0 w-full h-screen bg-black opacity-50 z-50"></div>
            )}
            {successCreate && (
               <Popup
                  label="Create Berhasil"
                  message="Create Berhasil"
                  navigateTo=""
                  isSuccess={true}
                  stateConcition={state.post}
                  stateName="post"
               />
            )}
            {errorCreate && (
               <Popup
                  label="Create Gagal"
                  message="Create Gagal"
                  navigateTo=""
                  isSuccess={false}
                  stateConcition={state.post}
                  stateName="post"
               />
            )}
            {successDelete && (
               <Popup
                  label="Delete Berhasil"
                  message="Delete Berhasil"
                  navigateTo=""
                  isSuccess={true}
                  stateConcition={state.delete}
                  stateName="delete"
               />
            )}
            {errorDelete && (
               <Popup
                  label="Delete Gagal"
                  message="Delete Gagal"
                  navigateTo=""
                  isSuccess={false}
                  stateConcition={state.delete}
                  stateName="delete"
               />
            )}
            {successUpdate && (
               <Popup
                  label="Update Berhasil"
                  message="Update Berhasil"
                  navigateTo=""
                  isSuccess={true}
                  stateConcition={state.update}
                  stateName="update"
               />
            )}
            {errorUpdate && (
               <Popup
                  label="Update Gagal"
                  message="Update Gagal"
                  navigateTo=""
                  isSuccess={false}
                  stateConcition={state.update}
                  stateName="update"
               />
            )}
            {isLoading ? (
               <div className="flex-1 flex items-center justify-center">
                  <div className="text-lg text-gray-600">Loading...</div>
               </div>
            ) : (
               <div className="overflow-scroll scrollbar-hide w-full">
                  <div className="flex-1 m-4 scrollbar-hide">
                     <div className="w-full flex justify-between mb-6">
                        <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                           Data Absensi Tutor
                        </p>

                     </div>

                     <div className="p-5 bg-white shadow-md rounded-md mb-10">
                        <div className="flex justify-between items-center py-3">
                           <p>Daftar Absensi Tutor</p>
                           <button
                              onClick={() => setShowPopup(true)}
                              className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                           >
                              Tambah
                           </button>
                        </div>
                        {showPopup && (
                           <CardCreateDataAbsensiTutor
                              setShow={setShowPopup}
                              setSuccessCreate={setSuccessCreate}
                              setErrorCreate={setErrorCreate}
                              setSuccessUpdate={setSuccessUpdate}
                              setErrorUpdate={setErrorUpdate}
                              isEdit={isEdit}
                              idAbsensiTutor={idAbsensiTutorString}
                           />
                        )}

                        <GeneralTable
                           fromComponent="GeneralComponent"
                           label={[
                              "Nama Tutor",
                              "Nama Ekskul",
                              "Status",
                              "Keterangan",
                              "Waktu",
                           ]}
                           data={formattedData || []}
                           action={true}
                           keys={["nama_tutor", "nama_ekskul", "status", "keterangan", "waktu"]}
                           onDelete={handleDeleteDataAbsensiTutor}
                           onEdit={handleEditDataAbsensiTutor}
                        />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default DataAbsensiTutor;