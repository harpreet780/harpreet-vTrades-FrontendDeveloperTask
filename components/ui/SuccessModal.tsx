'use client';

import Button from '@/components/ui/Button';
import Image, { StaticImageData } from 'next/image';

interface SuccessModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    buttonText: string;
    onClose: () => void;
    src: string | StaticImageData;
}

const SuccessModal = ({ isOpen, title, message, src, buttonText, onClose }: SuccessModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/40 animate-in fade-in duration-200">
            <div className="bg-[#1F2129] border border-zinc-800 rounded-2xl w-full max-w-[500px] p-[40px] shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-[31px]">
                        <Image
                            src={src || ""}
                            alt="Success"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    <h3 className="text-[20px] font-semibold text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6 leading-normal">
                        {message}
                    </p>
                    {/*--- Button wrap == */}
                    <div className="flex justify-end w-full">
                        <Button
                            onClick={onClose}
                            className="px-[40px] bg-primary hover:bg-primary-hover text-white rounded-xl py-3 text-sm font-medium transition-colors"
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
