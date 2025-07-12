'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Edit, Trash2, Calendar, ThumbsUp } from 'lucide-react';
import { Rating } from '@/components/product/Rating';
import { getUserReviews, deleteReview } from '@/actions/review-user-actions';
import { useRouter } from 'next/navigation';

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  helpful: number;
  verified: boolean;
  sanityProductId: string;
  createdAt: string;
  updatedAt: string;
}

interface MyReviewsClientProps {
  user: {
    id: number;
    email: string;
  };
}

export default function MyReviewsClient({ user }: MyReviewsClientProps) {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadReviews = useCallback(async () => {
    try {
      const result = await getUserReviews(user.id);
      if (result.success) {
        setReviews(result.reviews || []);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to load reviews' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to load reviews' });
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const result = await deleteReview(reviewId, user.id);
      if (result.success) {
        setReviews(reviews.filter(review => review.id !== reviewId));
        setMessage({ type: 'success', text: 'Review deleted successfully' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete review' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete review' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
              <p className="text-gray-600">Manage and view all your product reviews</p>
            </div>
            <button
              onClick={() => router.push('/profile')}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Messages */}
        {message && (
          <div className={`rounded-lg p-4 mb-6 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{reviews.length}</h3>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <ThumbsUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {reviews.reduce((sum, review) => sum + review.helpful, 0)}
                </h3>
                <p className="text-sm text-gray-600">Helpful Votes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : '0.0'}
                </h3>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600 mb-6">You haven&apos;t written any reviews yet. Start shopping and share your experience!</p>
            <button
              onClick={() => router.push('/search')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm border p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Rating rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                      {review.verified && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    {review.title && (
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h3>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => router.push(`/product/${review.sanityProductId}`)}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Review Content */}
                {review.content && (
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {review.content}
                    </p>
                  </div>
                )}

                {/* Review Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful} helpful</span>
                    </div>
                    <span>Product ID: {review.sanityProductId.slice(-8)}</span>
                  </div>
                  
                  <button
                    onClick={() => router.push(`/product/${review.sanityProductId}`)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Product →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
