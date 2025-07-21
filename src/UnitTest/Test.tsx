import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const LoginSuccessCard: React.FC = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-blue-50 w-[90%] max-w-sm p-8 rounded-3xl shadow-2xl text-center animate-fade-in-up relative border border-blue-200">
        {/* Icon sukses */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-blue-500 w-16 h-16 drop-shadow" />
        </div>

        {/* Judul dan pesan */}
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Login Berhasil</h2>
        <p className="text-blue-700 text-sm mb-6">
          Selamat datang kembali! Kamu telah berhasil login ke sistem.
        </p>

        {/* Tombol Oke */}
        <button
          onClick={() => setShow(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-200"
        >
          Oke
        </button>
      </div>
    </div>
  );
};

export default LoginSuccessCard;
