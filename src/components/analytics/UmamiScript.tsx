'use client';

import Script from 'next/script';

interface UmamiScriptProps {
  websiteId?: string;
  src?: string;
}

export default function UmamiScript({ 
  websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  src = process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://analytics.umami.is/script.js'
}: UmamiScriptProps) {
  if (!websiteId) {
    console.warn('Umami website ID not provided');
    return null;
  }

  return (
    <Script
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
