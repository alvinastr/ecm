'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getIconButtonClass, cn } from '@/lib/utils';

interface BackButtonProps {
  href?: string;
  fallbackHref?: string;
  label?: string;
  variant?: 'button' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function BackButton({
  href,
  fallbackHref = '/',
  label = 'Back',
  variant = 'button',
  size = 'md',
  className,
  onClick
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (href) {
      router.push(href);
    } else {
      // Try to go back in history, fallback to specified href
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push(fallbackHref);
      }
    }
  };

  if (variant === 'link') {
    return (
      <button
        onClick={handleBack}
        className={cn(
          'inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors',
          className
        )}
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={handleBack}
      className={cn(
        getIconButtonClass(size),
        className
      )}
      aria-label={label}
      title={label}
    >
      <ArrowLeft className={cn(
        size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
      )} />
    </button>
  );
}
