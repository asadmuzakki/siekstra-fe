import { FaBars } from "react-icons/fa6";
import { useGlobalContext } from "../Context/Context";
import PopupMenu from "./PopUpMenu";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../Hooks/useAuth";
import { useCookies } from "react-cookie";

import Popup from "./Popup"; // ⬅️ import Popup

const Header: React.FC = () => {
  const { state, stateHandle } = useGlobalContext();
  const { logout, success, error, succes_message, error_message } = useLogout();
  const navigate = useNavigate();
  const [cookies] = useCookies(["role"]);



  const handleProfile = () => {
    const role = cookies.role;
    if (role === "admin") navigate("/profile/admin");
    else if (role === "tutor") navigate("/profile/tutor");
    else if (role === "wali_murid") navigate("/profile/wali");
    else navigate("/login");
  };

  return (
    <header
      className={`bg-blue-50 sticky top-0 z-40 ${
        state.toggle
          ? "duration-500 transition-all ease-in-out"
          : "ml-64 duration-500 transition-all ease-in-out sm:ml-0"
      }`}
    >
      {/* Popup Logout */}
      {success && (
        <Popup
          label="Logout Berhasil"
          message={succes_message}
          navigateTo="/login"   // ⬅️ redirect setelah popup ditutup
          isSuccess={true}
          stateConcition={state.showPopup}
          stateName="showPopup"
        />
      )}
      {error && (
        <Popup
          label="Logout Gagal"
          message={error_message}
          navigateTo="" 
          isSuccess={false}
          stateConcition={state.showPopup}
          stateName="showPopup"
        />
      )}

      <div className="flex justify-between items-center px-4 h-20">
        <span
          onClick={() => stateHandle("toggle", !state.toggle)}
          className="cursor-pointer"
        >
          <FaBars className="text-lg hover:text-blue-400 hover:scale-110 transition-transform" />
        </span>

        <PopupMenu
          onProfile={handleProfile}
          onLogout={() => {
            logout(); // ⬅️ hanya panggil logout, popup handle redirect
          }}
        />
      </div>
    </header>
  );
};

export default Header;
