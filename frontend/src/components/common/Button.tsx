import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary" }) => {
  const base = "px-6 py-2 rounded-lg font-semibold transition";

  const styles =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-gray-800"   // Primary: dark gray/black
      : "bg-gray-200 text-gray-800 hover:bg-gray-300"; // Secondary: light gray

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};

export default Button;
