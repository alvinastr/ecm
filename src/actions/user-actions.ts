'use server';

import prisma from '@/lib/prisma';
import { verifyPassword, hashPassword } from '@/actions/auth';
import { revalidatePath } from 'next/cache';

interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

// Update user profile
export async function updateUserProfile(userId: number, profileData: ProfileData) {
  try {
    // Check if email is already taken by another user
    if (profileData.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: profileData.email,
          NOT: {
            id: userId
          }
        }
      });

      if (existingUser) {
        return {
          success: false,
          error: 'Email is already taken by another user'
        };
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: profileData.email,
        // Note: We would need to add these fields to the User model
        // For now, we'll just update the email
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    revalidatePath('/profile');
    return {
      success: true,
      user: updatedUser
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      error: 'Failed to update profile'
    };
  }
}

// Change user password
export async function changePassword(userId: number, currentPassword: string, newPassword: string) {
  try {
    // Get user with current password
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found'
      };
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      return {
        success: false,
        error: 'Current password is incorrect'
      };
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
        updatedAt: new Date()
      }
    });

    revalidatePath('/profile');
    return {
      success: true
    };
  } catch (error) {
    console.error('Error changing password:', error);
    return {
      success: false,
      error: 'Failed to change password'
    };
  }
}

// Get user profile
export async function getUserProfile(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        user: null
      };
    }

    return {
      success: true,
      user
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      success: false,
      error: 'Failed to fetch profile',
      user: null
    };
  }
}

// Get user statistics
export async function getUserStats(userId: number) {
  try {
    // Get user reviews count
    const reviewsCount = await prisma.review.count({
      where: { userId }
    });

    // Get user orders count (when we implement orders)
    // const ordersCount = await prisma.order.count({
    //   where: { userId }
    // });

    return {
      success: true,
      stats: {
        reviewsCount,
        ordersCount: 0, // Placeholder
        wishlistCount: 0, // Placeholder
        memberSince: new Date(), // We'll get this from user.createdAt
      }
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return {
      success: false,
      error: 'Failed to fetch user stats',
      stats: null
    };
  }
}
