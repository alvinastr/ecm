'use client';

import { useState, useEffect, useCallback } from 'react';
import { ReviewSummary } from './ReviewSummary';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { createReview, markReviewHelpful } from '@/actions/review-server-actions';
import { getProductReviews, getReviewStats, type ReviewStats } from '@/actions/review-action';

interface ProductReviewsProps {
  productId: string;
  user?: {
    id: number;
    email: string;
  } | null;
  className?: string;
}

export function ProductReviews({ productId, user, className }: ProductReviewsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = useState<any[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    try {
      const result = await getProductReviews(productId, 20);
      if (result.success) {
        setReviews(result.reviews || []);
      } else {
        setError(result.error || 'Failed to load reviews');
      }
    } catch {
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  const loadStats = useCallback(async () => {
    try {
      const reviewStats = await getReviewStats(productId);
      setStats(reviewStats);
    } catch {
      console.error('Failed to load review stats');
    }
  }, [productId]);

  // Load reviews and stats
  useEffect(() => {
    loadReviews();
    loadStats();
  }, [loadReviews, loadStats]);

  const handleSubmitReview = async (reviewData: {
    rating: number;
    title: string;
    content: string;
  }) => {
    if (!user) {
      setError('You must be signed in to write a review');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createReview(productId, user.id, reviewData);
      
      if (result.success) {
        setShowReviewForm(false);
        // Reload reviews and stats
        await loadReviews();
        await loadStats();
      } else {
        setError(result.error || 'Failed to submit review');
      }
    } catch {
      setError('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpfulClick = async (reviewId: string) => {
    try {
      const result = await markReviewHelpful(reviewId);
      if (result.success) {
        // Update the review in local state
        setReviews(prevReviews => 
          prevReviews.map(review => 
            review.id === reviewId 
              ? { ...review, helpful: review.helpful + 1 }
              : review
          )
        );
      }
    } catch (err) {
      console.error('Failed to mark review as helpful:', err);
    }
  };

  const handleWriteReview = () => {
    if (!user) {
      setError('You must be signed in to write a review');
      return;
    }
    setShowReviewForm(true);
    setError(null);
  };

  if (isLoading) {
    return (
      <div className={className}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Review Summary */}
      <ReviewSummary
        stats={stats}
        onWriteReview={handleWriteReview}
        className="mb-6"
      />

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-6">
          <ReviewForm
            onSubmit={handleSubmitReview}
            onCancel={() => setShowReviewForm(false)}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {/* Reviews List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Reviews ({stats.totalReviews})
          </h3>
          
          {/* Sort Options - TODO: Implement sorting */}
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="helpful">Most Helpful</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        <ReviewList
          reviews={reviews}
          onHelpfulClick={handleHelpfulClick}
        />
      </div>
    </div>
  );
}
