// import { IoMdLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { useGlobalContext } from "../Context/Context";
import PopupMenu from "./PopUpMenu";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../Hooks/useAuth";
import { useCookies } from "react-cookie";

const Header: React.FC = () => {
  const { state, stateHandle } = useGlobalContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [cookies] = useCookies(["role"]); // baca role dari cookies

  const handleProfile = () => {
    const role = cookies.role;
    if (role === "admin") {
      navigate("/profile/admin");
    } else if (role === "tutor") {
      navigate("/profile/tutor");
    } else if (role === "wali") {
      navigate("/profile/wali");
    } else {
      navigate("/login"); // fallback kalau tidak ada role
    }
  };

  return (
    <header
      className={`bg-blue-50 sticky top-0 z-40 ${
        state.toggle
          ? "duration-500 transition-all ease-in-out"
          : "ml-64 duration-500 transition-all ease-in-out sm:ml-0"
      }`}
    >
      <div className="flex justify-between items-center px-4 h-20">
        {/* Sidebar Toggle Button */}
        <span
          onClick={() => stateHandle("toggle", !state.toggle)}
          className="cursor-pointer"
        >
          <FaBars className="text-lg hover:text-blue-400 hover:scale-110 transition-transform" />
        </span>

        {/* User Actions with Popup */}
        <PopupMenu
          onProfile={handleProfile}
          onLogout={() => {
            logout();
            navigate("/login");
          }}
        />
      </div>
    </header>
  );
};

export default Header;
