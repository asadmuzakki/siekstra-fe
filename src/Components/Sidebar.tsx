import { useGlobalContext } from "../Context/Context";
import logo from "../assets/logo.png";
import * as Types from "../Types/sidebar.types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type SidebarProps = {
  sidebar: string;
};
const Sidebar: React.FC<SidebarProps> = ({ sidebar }) => {
  const path = window.location.pathname;
  const { state } = useGlobalContext();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<Types.SidebarMenu[]>([]);
  const isActive = (itemPath: string) => path.includes(itemPath);

  useEffect(() => {
    if (sidebar === "ADMIN") {
      setMenuItem(Types.admin);
      
    }
    if (sidebar === "WALI_MURID") {
      setMenuItem(Types.waliMurid);
    }
    if (sidebar === "TUTOR") {
      setMenuItem(Types.tutor);
    }
  });
  return (
    <div
      className={`${
        state.toggle ? "w-0 overflow-hidden" : "w-64"
      } bg-white text-gray-800 h-screen fixed sm:static top-0 left-0 flex flex-col shadow-lg border-r border-gray-100 transition-all duration-500 z-40`}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-center h-56  px-4">
        {!state.toggle && (
          <img
            src={logo}
            alt="Logo"
            className="h-40 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-4">
        <p className="px-6 text-base font-semibold text-gray-500 mb-2">
          Main Menu
        </p>
        <ul className="space-y-1 px-2">
          {menuItem.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => navigate(item.path || "/")}
                className={`flex items-center gap-3 px-4 py-3  cursor-pointer transition-all text-base
                  ${
                    isActive(item.path || "")
                      ? "text-blue-500 border-l-4 bg-blue-50"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
