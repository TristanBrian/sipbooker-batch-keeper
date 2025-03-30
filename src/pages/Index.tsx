
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts } from '@/lib/data';
import { Calendar, ShoppingBag, CreditCard } from 'lucide-react';

const Index = () => {
  const featuredProducts = getProducts().filter(product => product.featured);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] bg-wood-950 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1572530809556-bbde17247396?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
              Discover Premium Spirits for Every Occasion
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl">
              Curated selection of fine liquor with pre-booking options and doorstep delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/prebook">Pre-order</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Pre-book Spirits</h3>
                  <p className="text-muted-foreground">
                    Reserve your favorite bottles in advance for special occasions and events.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Express Pickup</h3>
                  <p className="text-muted-foreground">
                    Skip the wait with our convenient express pickup service.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                  <p className="text-muted-foreground">
                    Multiple payment options with secure transaction processing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Button asChild variant="outline">
                <Link to="/shop">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-wood-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to manage your orders?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Access the admin dashboard to update inventory and track payments.
            </p>
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link to="/admin">Admin Dashboard</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
