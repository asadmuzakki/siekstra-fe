import React from "react";

type EditPendaftaranPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode; // ✅ tambahkan ini
};

const EditPendaftaranPopup: React.FC<EditPendaftaranPopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-3xl shadow-2xl text-left relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* ✅ render children di sini */}
        <div>{children}</div>

        {/* Tombol close default */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPendaftaranPopup;
