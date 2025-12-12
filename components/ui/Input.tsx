'use client';

import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { RiErrorWarningFill } from 'react-icons/ri';

interface InputProps {
  label?: string;
  error?: string;
  id?: string;
  type?: string;
  className?: string;
}

const Input = ({
  label,
  id,
  type = 'text',
  className = '',
  error,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-normal text-white mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`w-full text-sm px-[12px] h-[50px] py-[15px] bg-input-bg border rounded-lg outline-none transition-all text-white placeholder-zinc-500 ${error
            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
            : 'border-border hover:border-border focus:border-primary focus:ring-1 focus:ring-primary'
            } ${isPassword ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEyeOff className="w-5 h-5" />
            ) : (
              <FiEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-2 animate-in slide-in-from-top-1 fade-in duration-200">
          <RiErrorWarningFill className="w-4 h-4 text-red-500" />
          <p className="text-xs text-red-500 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
