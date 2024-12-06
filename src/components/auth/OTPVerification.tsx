import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '../../lib/validation';
import { toast } from 'react-hot-toast';

interface OTPVerificationProps {
  email: string;
  onVerify: () => void;
  onResend: () => Promise<void>;
}

export function OTPVerification({ email, onVerify, onResend }: OTPVerificationProps) {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown, canResend]);

  const handleResend = async () => {
    try {
      await onResend();
      setCountdown(60);
      setCanResend(false);
      toast.success('OTP resent successfully');
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p className="text-gray-600 mb-6">
        We've sent a verification code to {email}
      </p>

      <form onSubmit={handleSubmit(onVerify)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <input
            {...register('otp')}
            type="text"
            maxLength={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter 6-digit code"
          />
          {errors.otp && (
            <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={handleResend}
          disabled={!canResend}
          className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          {canResend
            ? 'Resend OTP'
            : `Resend OTP in ${countdown}s`}
        </button>
      </div>
    </div>
  );
}