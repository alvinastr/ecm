import prisma from '@/lib/prisma';

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

// Get reviews for a product
export async function getProductReviews(productId: string, limit: number = 10, offset: number = 0) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        sanityProductId: productId
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: [
        { helpful: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit,
      skip: offset
    });

    return { success: true, reviews };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      success: false,
      error: 'Failed to fetch reviews',
      reviews: []
    };
  }
}

// Get review statistics for a product
export async function getReviewStats(productId: string): Promise<ReviewStats> {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        sanityProductId: productId
      },
      select: {
        rating: true
      }
    });

    const totalReviews = reviews.length;
    
    if (totalReviews === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const averageRating = reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / totalReviews;
    
    const ratingDistribution = reviews.reduce((dist: { 5: number; 4: number; 3: number; 2: number; 1: number }, review: { rating: number }) => {
      dist[review.rating as keyof typeof dist]++;
      return dist;
    }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

    return {
      totalReviews,
      averageRating,
      ratingDistribution
    };
  } catch (error) {
    console.error('Error fetching review stats:', error);
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }
}

// Update a review (only by the original author)
export async function updateReview(
  reviewId: string,
  userId: number,
  reviewData: Partial<ReviewData>
) {
  try {
    // Verify the review belongs to the user
    const existingReview = await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId: userId
      }
    });

    if (!existingReview) {
      throw new Error('Review not found or you do not have permission to edit it');
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        ...(reviewData.rating && { rating: reviewData.rating }),
        ...(reviewData.title && { title: reviewData.title.trim() }),
        ...(reviewData.content && { content: reviewData.content.trim() }),
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return { success: true, review: updatedReview };
  } catch (error) {
    console.error('Error updating review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update review'
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

    return { success: true };
  } catch (error) {
    console.error('Error deleting review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete review'
    };
  }
}
