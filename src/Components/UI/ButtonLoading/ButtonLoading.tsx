import React from 'react';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  isLoading?: boolean;
  text: React.ReactNode;
  isDisabled?: boolean;
  type: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
}

const ButtonLoading: React.FC<Props> = ({
  isLoading = false,
  text,
  type = 'submit',
  isDisabled = false,
  className = '',
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`btn btn-dark d-inline-flex align-items-center gap-2 ${className}`}
      onClick={onClick}
    >
      {isLoading ? <ButtonSpinner/> : null}
      {text}
    </button>
  );
};
export default ButtonLoading;