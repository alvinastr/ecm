'use client';

import { useState } from 'react';
import { Send, X } from 'lucide-react';
import { Rating } from './Rating';
import { cn } from '@/lib/utils';

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: {
    rating: number;
    title: string;
    content: string;
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ReviewForm({ onSubmit, onCancel, isSubmitting = false }: Omit<ReviewFormProps, 'productId'>) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {[key: string]: string} = {};
    if (rating === 0) newErrors.rating = 'Please select a rating';
    if (title.trim().length < 3) newErrors.title = 'Title must be at least 3 characters';
    if (content.trim().length < 10) newErrors.content = 'Review must be at least 10 characters';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit({ rating, title: title.trim(), content: content.trim() });
        // Reset form
        setRating(0);
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <Rating
            rating={rating}
            size="lg"
            interactive
            onRatingChange={setRating}
            className="mb-2"
          />
          {errors.rating && (
            <p className="text-red-600 text-sm">{errors.rating}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
            Review Title *
          </label>
          <input
            id="review-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience..."
            className={cn(
              "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              errors.title ? "border-red-300" : "border-gray-300"
            )}
            maxLength={100}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">{title.length}/100 characters</p>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="review-content" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="review-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell others about your experience with this product..."
            rows={4}
            className={cn(
              "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical",
              errors.content ? "border-red-300" : "border-gray-300"
            )}
            maxLength={1000}
            disabled={isSubmitting}
          />
          {errors.content && (
            <p className="text-red-600 text-sm mt-1">{errors.content}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">{content.length}/1000 characters</p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors",
              isSubmitting || rating === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            )}
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
