'use client';

import { useState, useEffect } from 'react';
import SalesCampaignBanner from '@/components/layout/SalesCampaignBanner';
import ProductGrid from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { Product } from '@/sanity.types';

interface FilterState {
  categories: string[];
  priceRange: { min: number; max: number };
  rating: number;
  availability: 'all' | 'in-stock' | 'on-sale';
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

interface SearchPageClientProps {
  initialProducts: Product[];
  searchQuery: string;
}

export function SearchPageClient({ initialProducts, searchQuery }: SearchPageClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 10000000 }, // 10 million IDR
    rating: 0,
    availability: 'all',
    sortBy: 'relevance'
  });

  // Mock categories data
  const categories = [
    { name: 'Electronics', count: 45 },
    { name: 'Clothing', count: 32 },
    { name: 'Home & Garden', count: 28 },
    { name: 'Sports', count: 19 },
    { name: 'Books', count: 15 },
    { name: 'Beauty', count: 12 }
  ];

  const priceRange = { min: 0, max: 10000000 };

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      // This would need category data from Sanity
      // For now, we'll keep all products
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const price = product.price || 0;
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });

    // Filter by rating (mock for now)
    if (filters.rating > 0) {
      // This would filter by actual review ratings
      // For now, we'll keep all products
    }

    // Filter by availability
    if (filters.availability === 'in-stock') {
      // This would check actual stock levels
      // For now, we'll keep all products
    } else if (filters.availability === 'on-sale') {
      // This would check for sale status
      // For now, we'll keep all products
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        // Would sort by actual ratings
        // For now, random sort based on ID
        filtered.sort((a, b) => a._id.localeCompare(b._id));
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = new Date(a._createdAt || '');
          const dateB = new Date(b._createdAt || '');
          return dateB.getTime() - dateA.getTime();
        });
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    <div>
      <SalesCampaignBanner />

      <div className='bg-red-50 p-4'>
        <div className='container mx-auto'>
          <h1 className='text-2xl md:text-3xl font-bold text-center text-red-600 mb-2'>
            Search Results for &quot;{searchQuery}&quot; - UP TO 90% OFF! 🔥
          </h1>
          <p className='text-center text-red-500 text-sm md:text-base animate-pulse'>
            ⚡️ Flash Sale Ending Soon! ⏰ Limited Time Only
          </p>
          <p className='text-center text-gray-600 text-xs mt-2'>
            Discover amazing deals matching your search
          </p>
        </div>
      </div>

      <div className='bg-yellow-50 py-3'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-center gap-4 text-sm'>
            <div className='flex items-center gap-2'>
              <span className='text-yellow-600'>🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-yellow-600'>⭐️</span>
              <span>Top Rated</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-yellow-600'>💰</span>
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </div>

      <section className='container mx-auto py-8'>
        <div className='flex gap-6'>
          {/* Filters Sidebar */}
          <div className='hidden md:block w-64 flex-shrink-0'>
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              priceRange={priceRange}
            />
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            {/* Mobile Filters */}
            <div className='md:hidden mb-4'>
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                categories={categories}
                priceRange={priceRange}
              />
            </div>

            {/* Results Header */}
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h2 className='text-lg font-semibold text-gray-900'>
                  {filteredProducts.length} Products Found
                </h2>
                <p className='text-sm text-gray-500'>
                  🎉 Amazing Deals Available Now!
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-6xl mb-4'>😕</div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  No products found
                </h3>
                <p className='text-gray-500 mb-4'>
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => setFilters({
                    categories: [],
                    priceRange: { min: 0, max: 10000000 },
                    rating: 0,
                    availability: 'all',
                    sortBy: 'relevance'
                  })}
                  className='text-blue-600 hover:text-blue-700 font-medium'
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
