'use client';
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Wijaya',
    location: 'Jakarta',
    rating: 5,
    comment: 'Pelayanan sangat memuaskan! Produk sesuai ekspektasi dan pengiriman cepat. Akan belanja lagi di KLIK MART.',
    avatar: '👩‍💼',
    product: 'Smartphone Samsung'
  },
  {
    id: '2',
    name: 'Budi Santoso',
    location: 'Surabaya',
    rating: 5,
    comment: 'Harga terjangkau dengan kualitas premium. Customer service responsif dan membantu. Highly recommended!',
    avatar: '👨‍💻',
    product: 'Laptop Gaming'
  },
  {
    id: '3',
    name: 'Maya Putri',
    location: 'Bandung',
    rating: 5,
    comment: 'Website mudah digunakan, checkout lancar, dan barang sampai dengan aman. KLIK MART memang terbaik!',
    avatar: '👩‍🎨',
    product: 'Tas Fashion'
  },
  {
    id: '4',
    name: 'Andi Rahman',
    location: 'Medan',
    rating: 5,
    comment: 'Promo dan diskon sering banget. Udah 3 kali belanja di sini, selalu puas dengan produk dan layanannya.',
    avatar: '👨‍🏫',
    product: 'Peralatan Olahraga'
  },
  {
    id: '5',
    name: 'Lisa Chen',
    location: 'Yogyakarta',
    rating: 5,
    comment: 'Free shipping untuk pembelian di atas 100rb itu sangat membantu. Barang original dan packaging rapi.',
    avatar: '👩‍🔬',
    product: 'Produk Skincare'
  },
  {
    id: '6',
    name: 'Rico Prasetyo',
    location: 'Bali',
    rating: 5,
    comment: 'Return policy-nya jelas dan mudah. Pernah ada kendala dengan pengiriman, tapi CS langsung bantu solve.',
    avatar: '👨‍🎨',
    product: 'Kamera Digital'
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl mr-4">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <StarRating rating={testimonial.rating} />
      </div>
      
      <blockquote className="text-gray-700 mb-4 italic">
        &ldquo;{testimonial.comment}&rdquo;
      </blockquote>
      
      {testimonial.product && (
        <div className="text-sm text-blue-600 font-medium">
          Purchased: {testimonial.product}
        </div>
      )}
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what real customers think about their KLIK MART experience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Trusted by thousands of customers</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="font-bold text-gray-700">🏆 Best E-commerce 2024</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="font-bold text-gray-700">🔒 SSL Secured</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="font-bold text-gray-700">📱 Mobile Friendly</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="font-bold text-gray-700">💳 Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
