import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";




type PopupMenuProps = {
  onLogout: () => void;
  onProfile: () => void;
};

const PopupMenu: React.FC<PopupMenuProps> = ({ onLogout, onProfile }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  // Tutup popup ketika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow text-gray-700 transition"
      >
        <FaRegUser className="text-lg" />
        <span>Akun</span>
      </button>

      {/* Popup content */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
          <button
            onClick={() => {
              onProfile();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700 rounded-t-xl transition"
          >
            Profil
          </button>
          <button
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 rounded-b-xl transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
