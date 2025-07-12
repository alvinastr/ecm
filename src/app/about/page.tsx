import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About KLIK MART</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your trusted online marketplace connecting you with quality products at unbeatable prices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, KLIK MART began with a simple mission: to make quality products 
              accessible to everyone at prices that don&apos;t break the bank. We believe that great 
              shopping experiences shouldn&apos;t come with premium price tags.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a small online store has grown into a comprehensive marketplace 
              featuring thousands of products across multiple categories. Our commitment to 
              customer satisfaction and product quality remains at the heart of everything we do.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To provide an exceptional online shopping experience that combines convenience, 
              quality, and affordability for customers across Indonesia.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">10,000+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">50,000+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Security</h3>
              <p className="text-gray-600">
                Your data and transactions are protected with industry-leading security measures.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping across Indonesia with real-time tracking.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">
                Our dedicated support team is here to help you every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
              <p className="text-gray-600">support@klikmart.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
              <p className="text-gray-600">+62 21 1234 5678</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
              <p className="text-gray-600">Mon-Fri: 9AM-6PM WIB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
