'use client';
import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('🎉 Thanks for subscribing! Check your email for confirmation.');
      setEmail('');
    } catch {
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with KLIK MART
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Get exclusive deals, new product alerts, and special offers delivered to your inbox!
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '⏳ Subscribing...' : '🚀 Subscribe'}
            </button>
          </form>
          
          {message && (
            <p className="mt-4 text-center p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              {message}
            </p>
          )}
          
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-purple-200">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>Weekly newsletters</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏷️</span>
              <span>Exclusive deals</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎁</span>
              <span>Special offers</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
