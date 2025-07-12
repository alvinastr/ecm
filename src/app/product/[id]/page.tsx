import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import AddToCartButton from "@/components/product/AddToCartButton";
import { ProductReviews } from "@/components/product/ProductReviewsSection";
import { formatPrice } from "@/lib/utils";
import { getProductById } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getCurrentSession } from "@/actions/auth";
import { Breadcrumb, BackButton } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductById(id);
  const { user } = await getCurrentSession();

  if (!product || !product.price || !product.title) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link 
            href="/"
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    );
  }

  const originalPrice = product.price * 2; // Show 2x as "original" price for discount effect

  const breadcrumbItems = [
    { name: 'Products', href: '/search' },
    { name: product.title, href: `/product/${id}`, isLast: true }
  ];

  return (
    <div className="bg-gray-50">
      <SalesCampaignBanner />

      {/* <-- BreadCrumb Navigation --> */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            <Breadcrumb items={breadcrumbItems} />
            <BackButton fallbackHref="/search" variant="link" />
          </div>
        </div>
      </div>

      {/* <-- Product Sale Section --> */}
      <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 py-6 px-4">
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center text-red-600">
                BEST PRICE! - UP TO 50% OFF
            </h1>
            <div className="flex flex-col items-center gap-2">
                <p className="text-center text-sm md:text-base text-red-500 font-semibold animate-pulse">
                    only for today, get this product at a special price!
                </p>
            </div>
        </div>
      </div>

        {/* <-- Product Details Section --> */}
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.image && (
                    <div className='bg-white rounded-2xl p-4 aspect-square overflow-hidden shadow-lg'>
                        <div className='relative aspect-square'>
                            <Image
                                fill
                                priority
                                className='object-cover hover:scale-105 transition-transform duration-300'
                                alt={product.title ?? 'Product Image'}
                                src={urlFor(product.image).url()}
                            />
                        </div>
                    </div>
                )}

                {/* <-- Product Information Section --> */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {product.title}
                    </h1>
                    {product.description && (
                        <p className="text-gray-600">
                            {product.description}
                        </p>
                    )}

                    {/* <-- Price Section --> */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex items-center gap-3">
                            <div className="flex items-baseline gap-1">
                                {/* <span className="text-xs font-bold text-red-600">IDR</span> */}
                                <span className="text-5xl font-black text-red-600 tracking-tight">
                                    {formatPrice(product.price)}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg text-gray-400 line-through decoration-red-500/50 decoration-2">
                                    {formatPrice(originalPrice)}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="bg-red-600 text-white px-2 py-0.5 rounded text-sm font-bold animate-pulse">
                                        -50%
                                    </span>
                                    <span className="text-red-600 font-bold text-sm">
                                        SAVINGS
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                            <span className="text-red-600 font-bold">💰</span>
                            <span className="text-red-600 font-medium text-sm">
                                You Save {formatPrice(originalPrice - product.price)}!
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-bold">{Math.floor(Math.random() * 50) + 20} SOLD! In the last hour!!</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 p-4 rounded-xl mt-4">
                        <div className="flex items-center gap-2 text-yellow-800">
                            <span className="text-xl">⚡️</span>
                            <span className="font-bold">Limited Time Offer!</span>
                        </div>
                        <div className="text-sm text-yellow-700 mt-1 font-medium">
                            Order Now!
                        </div>
                    </div>

                    <AddToCartButton product={product}/>
                </div>
            </div>
            
            {/* Product Reviews Section */}
            <div className="mt-12">
                <ProductReviews 
                    productId={id}
                    user={user ? {
                      id: user.id,
                      email: user.email
                    } : null}
                />
            </div>
        </div>
    </div>
  );
};

export default ProductPage;
