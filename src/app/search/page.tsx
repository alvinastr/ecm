import { SearchPageClient } from '@/components/product/SearchPageClient';
import { searchProducts } from '@/sanity/lib/client';
import React from 'react';

type SearchPageProps = {
    searchParams: Promise<{ query: string }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const { query } = await searchParams;
    const products = await searchProducts(query);

    return <SearchPageClient initialProducts={products} searchQuery={query} />;
};

export default SearchPage;