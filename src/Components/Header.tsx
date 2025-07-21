// import { IoMdLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { useGlobalContext } from "../Context/Context";
import { LuUser } from "react-icons/lu";

// import avatarUrl from '../../assets/amel.jpeg'

const Header: React.FC = () => {
  const { state, stateHandle } = useGlobalContext();
  return (
    <header
      className={`bg-blue-50  sticky top-0 z-40 ${
        state.toggle
          ? " duration-500 transition-all ease-in-out  "
          : "ml-64 duration-500 transition-all ease-in-out sm:ml-0"
      }`}
    >
      <div className="flex justify-between items-center px-4 h-20">
        {/* Logo or Dashboard Title */}
        <span
          onClick={() => stateHandle("toggle", !state.toggle)}
          className="cursor-pointer"
        >
          <FaBars className="text-lg hover:text-blue-400 hover:scale-110 transition-transform" />
        </span>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <LuUser className="text-2xl" />
          <p className="text-base">Asad</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
