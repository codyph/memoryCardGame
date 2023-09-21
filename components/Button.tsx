import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      className={twMerge(
        `w-full rounded-[25px] border border-transparent bg-[#25445B] p-3 font-bold tracking-widest transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
