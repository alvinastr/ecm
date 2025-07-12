import Link from 'next/link';
import React from 'react';

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">What&apos;s next?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• You will receive an email confirmation shortly</li>
              <li>• Your order will be processed within 1-2 business days</li>
              <li>• Shipping typically takes 3-7 business days</li>
            </ul>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="/"
              className="flex-1 bg-black text-white text-center py-2 px-4 rounded-md font-medium hover:bg-gray-900 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="flex-1 bg-gray-200 text-gray-900 text-center py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
