'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isActiveRoute, cn } from '@/lib/utils';

interface NavigationTab {
  name: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface NavigationTabsProps {
  tabs: NavigationTab[];
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function NavigationTabs({
  tabs,
  variant = 'underline',
  size = 'md',
  className
}: NavigationTabsProps) {
  const pathname = usePathname();

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const getTabClass = (tab: NavigationTab, isActive: boolean) => {
    const baseClasses = cn(
      'inline-flex items-center gap-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      sizeClasses[size],
      tab.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
    );

    switch (variant) {
      case 'pills':
        return cn(
          baseClasses,
          'rounded-full',
          isActive
            ? 'bg-black text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        );
      case 'underline':
        return cn(
          baseClasses,
          'border-b-2 pb-2',
          isActive
            ? 'border-black text-gray-900'
            : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
        );
      default:
        return cn(
          baseClasses,
          'rounded-md',
          isActive
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        );
    }
  };

  return (
    <nav className={cn('flex space-x-1', className)}>
      {tabs.map((tab) => {
        const isActive = isActiveRoute(pathname, tab.href, false);
        
        return (
          <Link
            key={tab.href}
            href={tab.disabled ? '#' : tab.href}
            className={getTabClass(tab, isActive)}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.icon}
            <span>{tab.name}</span>
            {tab.badge && (
              <span className={cn(
                'inline-flex items-center justify-center rounded-full text-xs font-medium',
                variant === 'pills' && isActive
                  ? 'bg-white text-black px-2 py-0.5'
                  : 'bg-gray-100 text-gray-600 px-2 py-0.5'
              )}>
                {tab.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
