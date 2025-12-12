'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiClock } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import OtpInput from '@/components/ui/OtpInput';
import SuccessModal from '@/components/ui/SuccessModal';
import {
  forgotPasswordEmailSchema,
  forgotPasswordOtpSchema,
  forgotPasswordResetSchema,
  ForgotPasswordEmailData,
  ForgotPasswordOtpData,
  ForgotPasswordResetData
} from '@/schemas/auth';
import messageBoxIcon from "@/static/images/message-box.png";
import checkmarkIcon from "@/static/images/checkmark.png";

type Step = 'EMAIL' | 'OTP' | 'NEW_PASSWORD';

function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('EMAIL');
  const [email, setEmail] = useState('');

  // Timer State===
  const [timer, setTimer] = useState(30);

  // Modal States manaages/===
  const [showLinkSentModal, setShowLinkSentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // all Forms handlers here
  const emailForm = useForm<ForgotPasswordEmailData>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    mode: "onChange"
  });

  const otpForm = useForm<ForgotPasswordOtpData>({
    resolver: zodResolver(forgotPasswordOtpSchema),
    mode: "onChange"
  });

  const updateForm = useForm<ForgotPasswordResetData>({
    resolver: zodResolver(forgotPasswordResetSchema),
    mode: "onChange"
  });

  // Timer Logic for otp===
  useEffect(() => {
    let interval: number | undefined;
    if (step === 'OTP' && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => window.clearInterval(interval);
  }, [step, timer]);

  // send otp handled==
  const onEmailSubmit = async (data: ForgotPasswordEmailData) => {
    try {
      const response = await fetch('/api/auth/forgot-password/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || 'Error occurred');
        return;
      }

      setEmail(data.email);
      setShowLinkSentModal(true);
    } catch (error) {
      toast.error('Failed to connect to server');
    }
  };
  // otp response handelr==
  const onOtpSubmit = async (data: ForgotPasswordOtpData) => {
    try {
      const response = await fetch('/api/auth/forgot-password/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || 'Invalid OTP');
        return;
      }

      console.log('OTP Verified:', data.otp);
      toast.success('OTP Verified Successfully');
      setStep('NEW_PASSWORD');
    } catch (error) {
      toast.error('Failed to verify OTP');
    }
  };
  // forgot password rest==
  const onResetSubmit = async (data: ForgotPasswordResetData) => {
    try {
      const response = await fetch('/api/auth/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, email })
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || 'Failed to reset password');
        return;
      }

      console.log('Password Reset:', data);
      setShowSuccessModal(true);
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };
  // modal closing states manage==
  const handleLinkModalClose = () => {
    setShowLinkSentModal(false);
    setStep('OTP');
    setTimer(30);
  };
  // for resend opt==
  const handleResendOtp = async () => {
    setTimer(30);
    try {
      const response = await fetch('/api/auth/forgot-password/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        toast.success('OTP Resent Successfully');
      } else {
        toast.error('Failed to resend OTP');
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };
  // for change email==
  const handleChangeEmail = () => {
    setStep('EMAIL');
    setEmail('');
    emailForm.reset();
  };

  return (
    <div className="w-full">
      {/*======== Step 1: Email Input===============------ */}
      {step === 'EMAIL' && (
        <>
          <div className="text-left mb-6 2xl:mb-10">
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-2 2xl:mb-[8px]">Forgot Your Password?</h2>
            <p className="text-sm text-light-white">
              Don’t worry! Enter your email address, and we’ll send you a link to reset it.
            </p>
          </div>

          <form onSubmit={emailForm?.handleSubmit(onEmailSubmit)} className="mt-5 2xl:mt-[32px]">
            <div className="mb-6 2xl:mb-[44px]">
              <Input
                id="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                error={emailForm?.formState?.errors?.email?.message}
                {...emailForm?.register('email')}
              />
            </div>

            <Button type="submit" fullWidth isLoading={emailForm?.formState?.isSubmitting}>
              Submit
            </Button>
          </form>
        </>
      )}

      {/*========= Step 2: OTP Input============= */}
      {step === 'OTP' && (
        <>
          <div className="text-left mb-5 2xl:mb-[32px]">
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-2 2xl:mb-[8px]">Enter OTP</h2>
            <p className="text-sm text-light-white">
              Enter the OTP that we have sent to your email address <span className="text-white font-medium">{email}</span>.
            </p>
          </div>
          <div className="mb-5 2xl:mb-[32px] text-left">
            <button
              type="button"
              onClick={handleChangeEmail}
              className="text-primary text-sm font-medium hover:text-primary-hover transition-colors"
            >
              Change Email Address
            </button>
          </div>
          <form onSubmit={otpForm?.handleSubmit(onOtpSubmit)} className="mb-8 2xl:mb-[44px]">
            <div className="mb-6 2xl:mb-8">
              <OtpInput
                length={6}
                onComplete={(code) => otpForm?.setValue('otp', code, { shouldValidate: true })}
              />
            </div>

            {/*=========== Timer and Resend Row============== */}
            <div className="flex items-center justify-between mb-6 2xl:mb-[32px] text-sm min-h-[20px]">
              {timer > 0 ? (
                <div className="flex items-center text-light-white">
                  <FiClock className="w-4 h-4 mr-2" />
                  <span>{timer} Sec</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="cursor-pointertext-primary font-medium hover:text-primary-hover transition-colors"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <Button type="submit" fullWidth isLoading={otpForm?.formState?.isSubmitting}>
              Continue
            </Button>
          </form>
        </>
      )}

      {/* =========Step 3: New Password=============== */}
      {step === 'NEW_PASSWORD' && (
        <>
          <div className="text-left mb-6 2xl:mb-10">
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-2 2xl:mb-[8px]">Create New Password</h2>
            <p className="text-sm text-light-white">
              Choose a strong and secure password to keep your account safe. Make sure it’s easy for you to remember, but hard for others to guess!
            </p>
          </div>

          <form onSubmit={updateForm?.handleSubmit(onResetSubmit)} className="mt-5 2xl:mt-[32px] space-y-4 2xl:space-y-6">
            <div className="space-y-4">
              <Input
                id="new-password"
                label="Password"
                type="password"
                placeholder="Enter password"
                error={updateForm?.formState?.errors?.password?.message}
                {...updateForm?.register('password')}
              />

              <Input
                id="confirm-password"
                label="Re-enter your new password"
                type="password"
                placeholder="Re-enter your new password"
                error={updateForm?.formState?.errors?.confirmPassword?.message}
                {...updateForm?.register('confirmPassword')}
                onPaste={(e) => e.preventDefault()}
              />
            </div>
            <div className="pt-2 2xl:pt-4">
              <Button type="submit" fullWidth isLoading={updateForm?.formState?.isSubmitting}>
                Update Password
              </Button>
            </div>
          </form>
        </>
      )}

      {/* ==========Success Modals===== */}
      <SuccessModal
        isOpen={showLinkSentModal}
        title="Link Sent Successfully!"
        message={`Check your inbox! We’ve sent you an email with instructions to reset your password`}
        buttonText="Okay"
        src={messageBoxIcon}
        onClose={handleLinkModalClose}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        title="Password Created!"
        src={checkmarkIcon}
        message="Your password has been successfully updated. You can now use your new password to log in."
        buttonText="Okay"
        onClose={() => router.push('/signin')}
      />
    </div>
  );
}

export default ForgotPassword;
