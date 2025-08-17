import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

type ProfileForm = {
  email?: string;
  nama: string;
  password: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["role", "user_id"]);
  const role = cookies.role;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>();

  const onSubmit = (data: ProfileForm) => {
    console.log("Profile Updated:", data);
    // TODO: panggil API update profile di sini
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar={role} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>

        {/* Konten */}
        <div className="overflow-scroll scrollbar-hide w-full">
          <div className="flex-1 m-4 scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Profil
              </p>
            </div>

            {/* Card Profile */}
            <div className="p-6 bg-white shadow-md rounded-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email hanya Admin & Tutor */}
                {(role === "admin" || role === "tutor") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email
                    </label>
                    <input
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

                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    {...register("nama", { required: "Nama wajib diisi" })}
                    className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                  {errors.nama && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nama.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password wajib diisi",
                    })}
                    className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Button */}
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
