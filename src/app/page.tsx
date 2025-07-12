import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import HeroSection from "@/components/layout/HeroSection";
import ProductGrid from "@/components/product/ProductGrid";
import NewsletterSignup from "@/components/marketing/NewsletterSignup";
import Testimonials from "@/components/marketing/Testimonials";
import { getAllProducts } from "@/sanity/lib/client";

const Home = async () => {
  const products = await getAllProducts();

  return (
    <div>
      <SalesCampaignBanner />
      <HeroSection />
      
      {/* Featured Products Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🔥 Featured Products
          </h2>
          <p className="text-xl text-gray-600">
            Discover our best-selling items and latest arrivals
          </p>
        </div>
        <ProductGrid products={products}/>
      </section>

      <Testimonials />
      <NewsletterSignup />
    </div>
  );
}

export default Home;
