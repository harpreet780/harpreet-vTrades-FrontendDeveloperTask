'use client';

import React, { useState } from 'react';
import OTPInput from 'react-otp-input';

interface OtpInputProps {
    length?: number;
    onComplete: (otp: string) => void;
}

const OtpInput = ({ length = 5, onComplete }: OtpInputProps) => {
    const [otp, setOtp] = useState('');

    // Only allow numeric input
    const handleChange = (value: string) => {
        if (!/^\d*$/.test(value)) return;

        setOtp(value);
        if (value.length === length) {
            onComplete(value);
        }
    };

    return (
        <OTPInput
            value={otp}
            onChange={handleChange}
            numInputs={length}
            inputType="tel"
            shouldAutoFocus
            renderInput={(props) => (
                <input
                    {...props}
                    placeholder="0"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="!w-12 !h-12 text-center text-xl font-semibold bg-input-bg border border-zinc-700 rounded-lg text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            )}
            containerStyle={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'space-between',
                width: '100%'
            }}
        />
    );
}

export default OtpInput;
