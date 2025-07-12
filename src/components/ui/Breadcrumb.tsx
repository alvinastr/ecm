'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbClass, getBreadcrumbItemClass } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  href: string;
  isLast?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactNode;
  className?: string;
}

export default function Breadcrumb({
  items,
  showHome = true,
  separator = <ChevronRight className="w-4 h-4" />,
  className
}: BreadcrumbProps) {
  return (
    <nav className={getBreadcrumbClass() + (className ? ` ${className}` : '')} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {showHome && (
          <>
            <li>
              <Link
                href="/"
                className={getBreadcrumbItemClass(false)}
                aria-label="Home"
              >
                <Home className="w-4 h-4" />
              </Link>
            </li>
            {items.length > 0 && (
              <li className="text-gray-400">
                {separator}
              </li>
            )}
          </>
        )}
        
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <li>
              {item.isLast ? (
                <span className={getBreadcrumbItemClass(true)} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={getBreadcrumbItemClass(false)}
                >
                  {item.name}
                </Link>
              )}
            </li>
            {!item.isLast && index < items.length - 1 && (
              <li className="text-gray-400">
                {separator}
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
