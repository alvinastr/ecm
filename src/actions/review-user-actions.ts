'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Get all reviews by user
export async function getUserReviews(userId: number) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        rating: true,
        title: true,
        content: true,
        helpful: true,
        verified: true,
        sanityProductId: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return {
      success: true,
      reviews: reviews.map(review => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt.toISOString()
      }))
    };
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return {
      success: false,
      error: 'Failed to fetch reviews',
      reviews: []
    };
  }
}

// Delete a review (only by the original author)
export async function deleteReview(reviewId: string, userId: number) {
  try {
    // Verify the review belongs to the user
    const existingReview = await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId: userId
      }
    });

    if (!existingReview) {
      throw new Error('Review not found or you do not have permission to delete it');
    }

    await prisma.review.delete({
      where: { id: reviewId }
    });

    revalidatePath(`/product/${existingReview.sanityProductId}`);
    revalidatePath('/reviews');
    return { success: true };
  } catch (error) {
    console.error('Error deleting review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete review'
    };
  }
}

// Get review statistics for a user
export async function getUserReviewStats(userId: number) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId
      },
      select: {
        rating: true,
        helpful: true,
        createdAt: true
      }
    });

    const totalReviews = reviews.length;
    const totalHelpful = reviews.reduce((sum, review) => sum + review.helpful, 0);
    const averageRating = totalReviews > 0 ? 
      reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

    // Get most recent review date
    const latestReview = reviews.length > 0 ? 
      reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0] : null;

    return {
      success: true,
      stats: {
        totalReviews,
        totalHelpful,
        averageRating: Math.round(averageRating * 10) / 10,
        latestReviewDate: latestReview?.createdAt.toISOString() || null
      }
    };
  } catch (error) {
    console.error('Error fetching user review stats:', error);
    return {
      success: false,
      error: 'Failed to fetch review statistics',
      stats: null
    };
  }
}
