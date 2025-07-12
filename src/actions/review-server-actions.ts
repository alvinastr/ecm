'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface ReviewData {
  rating: number;
  title: string;
  content: string;
}

export interface ReviewStats {
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

// Create a new review
export async function createReview(
  productId: string,
  userId: number,
  reviewData: ReviewData
) {
  try {
    // Check if user already reviewed this product
    const existingReview = await prisma.review.findUnique({
      where: {
        sanityProductId_userId: {
          sanityProductId: productId,
          userId: userId
        }
      }
    });

    if (existingReview) {
      throw new Error('You have already reviewed this product');
    }

    // Validate rating
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        sanityProductId: productId,
        userId: userId,
        rating: reviewData.rating,
        title: reviewData.title.trim(),
        content: reviewData.content.trim(),
        // TODO: Check if user has purchased this product to set verified = true
        verified: false
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    revalidatePath(`/product/${productId}`);
    return { success: true, review };
  } catch (error) {
    console.error('Error creating review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create review'
    };
  }
}

// Mark a review as helpful
export async function markReviewHelpful(reviewId: string) {
  try {
    const review = await prisma.review.update({
      where: { id: reviewId },
      data: {
        helpful: {
          increment: 1
        }
      }
    });

    revalidatePath('/product/[id]', 'page');
    return { success: true, review };
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    return {
      success: false,
      error: 'Failed to mark review as helpful'
    };
  }
}
