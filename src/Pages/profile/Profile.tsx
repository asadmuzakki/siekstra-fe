import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useGetProfile } from "../../Hooks/useGet"; // ⬅️ hook kita

type ProfileForm = {
  email?: string;
  name: string;
  password: string;
};

const Profile = () => {
  const [cookies] = useCookies(["role"]);
  const role = cookies.role;

  // ✅ pakai hook
  const { data, isLoading, isError } = useGetProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>();

  // inject data API ke form
  useEffect(() => {
    if (data) {
      reset({
        email: data.email ?? "",
        name: data.name ?? "",
        password: "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: ProfileForm) => {
    console.log("Profile Updated:", formData);
    // TODO: panggil API update profile di sini
  };

  if (isLoading) return <p className="p-6">Loading profile...</p>;
  if (isError) return <p className="p-6 text-red-500">Gagal memuat profil</p>;

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar={role} />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        <div className="overflow-scroll scrollbar-hide w-full">
          <div className="flex-1 m-4 scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Profil
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {(role === "admin" || role === "tutor") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email
                    </label>
                    <input
                    value={data?.user.email || ""}
                      type="email"
                      {...register("email", { required: "Email wajib diisi" })}
                      className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nama
                  </label>
                  <input
                  value={data?.user.name || ""}
                    type="text"
                    {...register("name", { required: "Nama wajib diisi" })}
                    className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: "Password wajib diisi" })}
                    className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow transition"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
