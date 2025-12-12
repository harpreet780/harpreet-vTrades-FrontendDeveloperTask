import React from 'react';
import { CgSpinner } from 'react-icons/cg';

interface ButtonProps {
    isLoading?: boolean;
    variant?: 'primary' | 'outline';
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

const Button = ({
    children,
    isLoading,
    variant = 'primary',
    fullWidth = false,
    leftIcon,
    className = '',
    disabled,
    ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    // common class which used in bothh buttonss -----
    const baseStyles = 'cursor-pointer inline-flex items-center justify-center px-4 py-3 min-h-[50px] rounded-lg text-[16px] font-semibold transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm',
        outline: 'border border-border bg-zinc-800/50 focus:ring-primary text-white hover:bg-zinc-800 hover:text-white',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <CgSpinner className="w-5 h-5 animate-spin mr-2" />
            ) : leftIcon ? (
                <span className="mr-[12px]">{leftIcon}</span>
            ) : null}
            {children}
        </button>
    );
};

export default Button;
