import { useEffect, useState } from "react";
import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useGetDataWaliMuridAdmin } from "../../Hooks/Admin/useGet";
import Popup from "../../Components/Popup";
import { useDeleteDataWaliMuridById } from "../../Hooks/Admin/useDelete";
import CardCreateDataWaliMurid from "../../Components/CardCreateDataWaliMurid";

const DataWaliMurid = () => {
   const { data, isLoading } = useGetDataWaliMuridAdmin();
   const { onDelete, isLoadingDelete, errorDelete, successDelete } = useDeleteDataWaliMuridById();
   const [showPopup, setShowPopup] = useState(false);
   const [successCreate, setSuccessCreate] = useState(false);
   const [errorCreate, setErrorCreate] = useState(false);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const formattedData = data?.data.map((item: any) => ({
      ...item,
      created_at: new Date(item.created_at).toLocaleDateString("id-ID"),
   }));
   const handleDeleteDataWaliMurid = (id: string) => {
      onDelete(id);
   };

   useEffect(() => {
      console.log(data);
   }, [data]);

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
                  stateConcition={true}
                  stateName="create"
               />
            )}
            {errorCreate && (
               <Popup
                  label="Create Gagal"
                  message="Create Gagal"
                  navigateTo=""
                  isSuccess={false}
                  stateConcition={true}
                  stateName="create"
               />
            )}
            {successDelete && (
               <Popup
                  label="Delete Berhasil"
                  message="Delete Berhasil"
                  navigateTo=""
                  isSuccess={true}
                  stateConcition={true}
                  stateName="delete"
               />
            )}
            {errorDelete && (
               <Popup
                  label="Delete Gagal"
                  message="Delete Gagal"
                  navigateTo=""
                  isSuccess={false}
                  stateConcition={true}
                  stateName="delete"
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
                           Data Wali Murid
                        </p>

                     </div>

                     <div className="p-5 bg-white shadow-md rounded-md mb-10">
                        <div className="flex justify-between items-center py-3">
                           <p>Daftar Data Wali Murid</p>
                           <button
                              onClick={() => setShowPopup(true)}
                              className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                           >
                              Tambah
                           </button>
                        </div>
                        {showPopup && (
                           <CardCreateDataWaliMurid
                              setShow={setShowPopup}
                              setSuccessCreate={setSuccessCreate}
                              setErrorCreate={setErrorCreate}
                           />
                        )}

                        <GeneralTable
                           fromComponent="GeneralComponent"
                           label={[
                              "Nama",
                              "Email",
                              "Tanggal Dibuat",
                              "Total Anak",
                           ]}
                           data={formattedData || []}
                           action={true}
                           keys={["name", "email", "created_at", "anak_count"]}
                           onDelete={handleDeleteDataWaliMurid}
                        />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default DataWaliMurid;