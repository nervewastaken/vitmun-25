import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    navigate(`/${label.toLowerCase()}`); // Navigate based on label (lowercased)
  };

  return (
    <button onClick={handleClick} className="font-bebas text-[3vh] bg-white py-2 px-8 border rounded-3xl  z-10">
  {label}
</button>

  );
};

export default Button;
