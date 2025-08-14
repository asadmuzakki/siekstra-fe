import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCreateDataTutor } from "../Hooks/Admin/usePost";
import { useUpdateDataTutor } from "../Hooks/Admin/usePatch";
import LoadingSpinner from "./LoadingSpinner";
import { useGetDataTutorById } from "../Hooks/Admin/useGet";

type Props = {
   setShow: (val: boolean) => void;
   setSuccessCreate: (val: boolean) => void;
   setErrorCreate: (val: boolean) => void;
   setSuccessUpdate: (val: boolean) => void;
   setErrorUpdate: (val: boolean) => void;
   isEdit?: boolean;
   idTutor?: string;
};

const CardCreateDataTutor: React.FC<Props> = ({
   setShow,
   setSuccessCreate,
   setErrorCreate,
   setErrorUpdate,
   setSuccessUpdate,
   idTutor,
   isEdit,
}) => {
   const [name, setName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

   const {
      register,
      handleSubmit,
      onSubmit,
      errors,
      success,
      error,
      isLoading,
   } = useCreateDataTutor();

   

   const {
      setValue,
      onSubmit_update,
      isSuccess_update,
      isError_update,
   } = useUpdateDataTutor(idTutor || "");

   const {data:data_tutor_by_id} = useGetDataTutorById(idTutor ?? '')

   const handleFormSubmit = (data: { name: string; email: string; password: string; password_confirmation: string }) => {
      onSubmit({ ...data, password_confirmation: passwordConfirmation });
      console.log({ ...data, password_confirmation: passwordConfirmation });
   };

   useEffect(() => {
      if (isEdit && idTutor) {
         setValue("name", name);
         setValue("email", email);
      }

      if (success) {
         setSuccessCreate(true);
         setShow(false);
      }
      if (error) {
         setErrorCreate(true);
         setShow(false);
      }
      if (isSuccess_update) {
         setSuccessUpdate(true);
         setShow(false);
      }
      if (isError_update) {
         setErrorUpdate(true);
         setShow(false);
      }
      console.log(data_tutor_by_id);
      
   }, [isEdit, idTutor, name, email, success, error, isSuccess_update, isError_update, setSuccessCreate, setErrorCreate, setSuccessUpdate, setErrorUpdate, setShow, setValue, data_tutor_by_id]);

   const handleFormUpdate = (data: { name: string; email: string; password: string; password_confirmation: string }) => {
      console.log("Data yang dikirim untuk update:", { ...data, password_confirmation: passwordConfirmation });
      onSubmit_update({ ...data, password_confirmation: passwordConfirmation });
   };

   return (
      <>
         {setShow && (
            <div
               className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100/80 z-50`}
            >
               <div className="relative max-w-md w-full mx-auto bg-white shadow-lg rounded-xl p-6">
                  {/* Close Button */}
                  <button
                     onClick={() => {
                        setShow(false);
                     }}
                     className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
                  >
                     <AiOutlineClose size={20} />
                  </button>

                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                     {isEdit ? "Edit Data Tutor" : "Create Data Tutor"}
                  </h2>
                  <form
                     onSubmit={
                        isEdit
                           ? (e) => {
                                e.preventDefault();
                                handleFormUpdate({ name, email, password, password_confirmation: passwordConfirmation });
                             }
                           : handleSubmit(handleFormSubmit)
                     }
                     className="space-y-4"
                  >
                     <div>
                        <label className="block text-sm font-medium text-gray-600">
                           Nama
                        </label>
                        <input
                           defaultValue={data_tutor_by_id?.user?.name}
                           {...register("name")}
                           onChange={(e) => setName(e.target.value)}
                           type="text"
                           className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                           <p className="text-red-500 text-xs mt-1">
                              {errors.name.message}
                           </p>
                        )}
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-600">
                           Email
                        </label>
                        <input
                            defaultValue={data_tutor_by_id?.user?.email}
                           {...register("email")}
                           onChange={(e) => setEmail(e.target.value)}
                           type="email"
                           className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                           <p className="text-red-500 text-xs mt-1">
                              {errors.email.message}
                           </p>
                        )}
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-600">
                           Password
                        </label>
                        <input
                           value={password}
                           {...register("password", { required: "Password is required" })}
                           onChange={(e) => setPassword(e.target.value)}
                           type="password"
                           className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                           <p className="text-red-500 text-xs mt-1">
                              {errors.password.message}
                           </p>
                        )}
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-600">
                           Konfirmasi Password
                        </label>
                        <input
                           value={passwordConfirmation}
                           {...register("password_confirmation", { required: "Password confirmation is required" })}
                           onChange={(e) => setPasswordConfirmation(e.target.value)}
                           type="password"
                           className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password_confirmation && (
                           <p className="text-red-500 text-xs mt-1">
                              {errors.password_confirmation.message}
                           </p>
                        )}
                     </div>

                     <div className="w-full flex justify-center items-center mt-5">
                        <button
                           type="submit"
                           className="px-6 py-2 cursor-pointer flex items-center justify-between gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400"
                        >
                           <p>{isEdit ? "Update Data" : "Simpan Data"}</p>
                           {isLoading && <LoadingSpinner />}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </>
   );
};

export default CardCreateDataTutor;
