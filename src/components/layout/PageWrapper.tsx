'use client';

import React from 'react';
import { getPageWithStickyHeaderClass, getMainContentClass } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function PageWrapper({ 
  children, 
  className,
  contentClassName 
}: PageWrapperProps) {
  return (
    <div className={getPageWithStickyHeaderClass() + (className ? ` ${className}` : '')}>
      <main className={getMainContentClass() + (contentClassName ? ` ${contentClassName}` : '')}>
        {children}
      </main>
    </div>
  );
}
