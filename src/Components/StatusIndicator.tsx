const StatusIndicator: React.FC<{
  isActive: boolean;
  color: string;
  onClick: () => void;
}> = ({ isActive, color, onClick }) => (
  <button
    onClick={onClick}
    className={`w-4 h-4 rounded-full border-2 transition-all ${
      isActive
        ? `${color} border-gray-300`
        : "bg-gray-200 border-gray-300 hover:bg-gray-300"
    }`}
  />
);

export default StatusIndicator;
