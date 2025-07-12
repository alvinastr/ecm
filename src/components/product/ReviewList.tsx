'use client';

import { useState } from 'react';
import { ThumbsUp, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { Rating } from './Rating';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  user: {
    email: string;
  };
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  onHelpfulClick?: (reviewId: string) => void;
  className?: string;
}

export function ReviewList({ reviews, onHelpfulClick, className }: ReviewListProps) {
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());

  const handleHelpfulClick = (reviewId: string) => {
    if (!helpfulClicked.has(reviewId)) {
      setHelpfulClicked(prev => new Set(prev).add(reviewId));
      onHelpfulClick?.(reviewId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    if (name.length <= 2) return email;
    return `${name[0]}${'*'.repeat(name.length - 2)}${name[name.length - 1]}@${domain}`;
  };

  if (reviews.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-500 mb-2">No Reviews Yet</h3>
        <p className="text-gray-400">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {review.user.email[0].toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {maskEmail(review.user.email)}
                  </span>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Verified Purchase</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Rating rating={review.rating} size="sm" />
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {review.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => handleHelpfulClick(review.id)}
              disabled={helpfulClicked.has(review.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                helpfulClicked.has(review.id)
                  ? "bg-green-100 text-green-700 cursor-default"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              <ThumbsUp className={cn(
                "w-4 h-4",
                helpfulClicked.has(review.id) && "fill-current"
              )} />
              <span>
                Helpful ({review.helpful + (helpfulClicked.has(review.id) ? 1 : 0)})
              </span>
            </button>

            <div className="text-xs text-gray-500">
              Review #{review.id.slice(-8)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
