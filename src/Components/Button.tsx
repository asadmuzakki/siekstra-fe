type ButtonProps = {
  buttonLabel: string;
};

const Button: React.FC<ButtonProps> = ({ buttonLabel }) => {
  return (
    <div className="flex justify-end items-center w-full py-3">
      <button className="py-1 px-3 bg-blue-500 text-white rounded-md cursor-pointer">
        {buttonLabel}
      </button>
    </div>
  );
};

export default Button;
