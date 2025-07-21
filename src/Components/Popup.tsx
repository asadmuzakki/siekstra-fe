import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/Context";

type PopupType = {
  label: string;
  message: string;
  navigateTo?: string;
  isSuccess: boolean;
  stateName?: string;
  stateConcition?:boolean
};
const Popup: React.FC<PopupType> = ({
  label,
  message,
  navigateTo,
  isSuccess,
  stateConcition,
  stateName
}) => {
  const navigate = useNavigate();
  const { stateHandle } = useGlobalContext();
  return (
    <div>
      {stateConcition && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-blue-50 w-[90%] max-w-sm p-8 rounded-3xl shadow-2xl text-center animate-fade-in-up relative border border-blue-200">
            {/* Icon sukses */}
            {isSuccess ? (
              <div className="flex justify-center mb-4">
                <FaCheckCircle className="text-blue-500 w-16 h-16 drop-shadow" />
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <FaTimesCircle className="text-red-500 w-16 h-16 drop-shadow" />
              </div>
            )}

            {/* Judul dan pesan */}
            <h2 className="text-2xl font-bold text-blue-800 mb-2">{label}</h2>
            <p className="text-blue-700 text-sm mb-6">{message}</p>

            {/* Tombol Oke */}
            <button
              onClick={() => {
                navigate(`${navigateTo}`);
                stateHandle(`${stateName}`, false);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
