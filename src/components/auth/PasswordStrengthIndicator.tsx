import React from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const percentage = (strength / 5) * 100;

  const getColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getMessage = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="mt-1">
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full transition-all ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`text-sm mt-1 ${getColor().replace('bg-', 'text-')}`}>
        {getMessage()}
      </p>
    </div>
  );
}