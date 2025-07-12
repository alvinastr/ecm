'use client';

import { Star, BarChart3 } from 'lucide-react';
import { Rating } from './Rating';
import { cn } from '@/lib/utils';

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface ReviewSummaryProps {
  stats: ReviewStats;
  onWriteReview?: () => void;
  className?: string;
}

export function ReviewSummary({ stats, onWriteReview, className }: ReviewSummaryProps) {
  const { totalReviews, averageRating, ratingDistribution } = stats;

  const getPercentage = (count: number) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Rating rating={averageRating} size="lg" />
              <span className="text-2xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="text-gray-600">
              Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </div>
          </div>
        </div>

        {onWriteReview && (
          <button
            onClick={onWriteReview}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Star className="w-4 h-4" />
            Write Review
          </button>
        )}
      </div>

      {/* Rating Distribution */}
      {totalReviews > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Rating Distribution</span>
          </div>
          
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating as keyof typeof ratingDistribution];
            const percentage = getPercentage(count);
            
            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm text-gray-600">{rating}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="flex items-center gap-2 w-16">
                  <span className="text-sm text-gray-600">{percentage}%</span>
                  <span className="text-xs text-gray-500">({count})</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalReviews === 0 && (
        <div className="text-center py-8">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No reviews yet</p>
          {onWriteReview && (
            <button
              onClick={onWriteReview}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Star className="w-4 h-4" />
              Be the first to review
            </button>
          )}
        </div>
      )}
    </div>
  );
}
