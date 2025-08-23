import { AiOutlineClose } from "react-icons/ai";

type PopUpCardWaliProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const PopUpCardWali: React.FC<PopUpCardWaliProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <AiOutlineClose size={22} />
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
        )}

        {/* Content */}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default PopUpCardWali;
