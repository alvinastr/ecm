'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Rating } from './Rating';
import { cn } from '@/lib/utils';

interface FilterState {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  availability: 'all' | 'in-stock' | 'on-sale';
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: Array<{ name: string; count: number }>;
  priceRange: { min: number; max: number };
  className?: string;
}

export function ProductFilters({ 
  filters, 
  onFiltersChange, 
  categories, 
  priceRange,
  className 
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const clearAllFilters = () => {
    updateFilters({
      categories: [],
      priceRange: { min: priceRange.min, max: priceRange.max },
      rating: 0,
      availability: 'all',
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.priceRange.min > priceRange.min ||
    filters.priceRange.max < priceRange.max ||
    filters.rating > 0 ||
    filters.availability !== 'all';

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {filters.categories.length + (filters.rating > 0 ? 1 : 0) + (filters.availability !== 'all' ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Filter Panel */}
      <div className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-sm",
        // Mobile styles
        "md:relative md:translate-x-0 md:w-auto md:h-auto md:shadow-sm",
        // Mobile panel styles
        "fixed top-0 right-0 h-full w-80 z-50 shadow-xl transform transition-transform duration-300 md:transform-none",
        isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        className
      )}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="p-4 space-y-6 max-h-[calc(100vh-120px)] md:max-h-none overflow-y-auto">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-medium text-gray-900">Categories</span>
              <ChevronDown className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                expandedSections.categories && "rotate-180"
              )} />
            </button>
            
            {expandedSections.categories && (
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <label key={category.name} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.name)}
                      onChange={() => toggleCategory(category.name)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 flex-1">{category.name}</span>
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-medium text-gray-900">Price Range</span>
              <ChevronDown className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                expandedSections.price && "rotate-180"
              )} />
            </button>
            
            {expandedSections.price && (
              <div className="mt-2 space-y-3">
                <div className="flex gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min</label>
                    <input
                      type="number"
                      value={filters.priceRange.min}
                      onChange={(e) => updateFilters({
                        priceRange: { ...filters.priceRange, min: Number(e.target.value) }
                      })}
                      min={priceRange.min}
                      max={priceRange.max}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max</label>
                    <input
                      type="number"
                      value={filters.priceRange.max}
                      onChange={(e) => updateFilters({
                        priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                      })}
                      min={priceRange.min}
                      max={priceRange.max}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
                
                {/* Price Range Slider */}
                <div className="relative">
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.priceRange.max}
                    onChange={(e) => updateFilters({
                      priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-medium text-gray-900">Minimum Rating</span>
              <ChevronDown className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                expandedSections.rating && "rotate-180"
              )} />
            </button>
            
            {expandedSections.rating && (
              <div className="mt-2 space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => updateFilters({ rating })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <Rating rating={rating} size="sm" />
                    <span className="text-sm text-gray-700">& Up</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === 0}
                    onChange={() => updateFilters({ rating: 0 })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">All Ratings</span>
                </label>
              </div>
            )}
          </div>

          {/* Availability */}
          <div>
            <button
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-medium text-gray-900">Availability</span>
              <ChevronDown className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                expandedSections.availability && "rotate-180"
              )} />
            </button>
            
            {expandedSections.availability && (
              <div className="mt-2 space-y-2">
                {[
                  { value: 'all', label: 'All Products' },
                  { value: 'in-stock', label: 'In Stock' },
                  { value: 'on-sale', label: 'On Sale' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={filters.availability === option.value}
                      onChange={() => updateFilters({ availability: option.value as FilterState['availability'] })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="border-t p-4 md:hidden">
          <div className="flex gap-3">
            <button
              onClick={clearAllFilters}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
