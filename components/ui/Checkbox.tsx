'use client';

interface CheckboxProps {
    label?: string;
    id?: string;
    className?: string;
};

const Checkbox = ({ label, id, className, ...props }: CheckboxProps) => {
    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                className={`h-[18px] w-[18px] cursor-pointer rounded-md border-zinc-700 bg-input-bg text-primary focus:ring-1 focus:ring-primary focus:ring-offset-0 transition-all accent-primary ${className || ''}`}
                {...props}
            />
            {label && (
                <label
                    htmlFor={id}
                    className="ml-[8px] font-normal cursor-pointer block text-[12px] text-white select-none"
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
