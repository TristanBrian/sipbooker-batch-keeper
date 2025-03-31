import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts } from '@/lib/data';
import { Calendar, ShoppingBag, CreditCard, ArrowRight, Star } from 'lucide-react';

const Index = () => {
  const featuredProducts = getProducts().filter(product => product.featured);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative h-[600px] bg-wood-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613688270662-193e95268aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=85')] bg-cover bg-center opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start">
            <span className="inline-block py-1 px-3 mb-4 bg-amber-600/90 text-white rounded-full text-sm font-medium tracking-wider shadow-md">PREMIUM COLLECTION</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-2xl leading-tight hero-text-glow">
              Experience Luxury with <span className="text-amber-500">Maybach Liquor</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-100">
              Indulge in our curated selection of world-class spirits, rare finds, and exclusive limited editions with doorstep delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="xl" variant="hero" className="btn-hover-effect">
                <Link to="/shop" className="flex items-center gap-2">Shop Collection <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="xl" variant="heroOutline" className="btn-hover-effect">
                <Link to="/prebook">Reserve Premium</Link>
              </Button>
            </div>
            
            <div className="flex items-center mt-8 text-amber-300">
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <span className="ml-2 text-gray-200">Trusted by over 10,000 customers</span>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Maybach Experience</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover why connoisseurs choose Maybach Liquor for their premium spirits needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Pre-book Exclusives</h3>
                  <p className="text-muted-foreground">
                    Reserve limited edition bottles before they're available to the general public.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Express Service</h3>
                  <p className="text-muted-foreground">
                    Enjoy our convenient express pickup or premium doorstep delivery service.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                  <p className="text-muted-foreground">
                    Multiple payment options including M-Pesa for hassle-free transactions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-20 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold">Featured Collection</h2>
                <p className="text-muted-foreground mt-2">Handpicked premium selections for discerning tastes</p>
              </div>
              <Button asChild variant="premium" className="border-amber-600">
                <Link to="/shop" className="flex items-center gap-2">View All <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20 bg-wood-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-3">What Our Clients Say</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover why our customers trust Maybach Liquor for their premium spirit needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-wood-800 text-white border-none shadow-lg">
                <CardContent className="pt-8 px-6 pb-6">
                  <div className="flex mb-4">
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                  </div>
                  <p className="italic mb-4">
                    "The pre-booking service is incredible. I was able to secure a rare bottle that I'd been searching for years!"
                  </p>
                  <div className="font-semibold">James K.</div>
                  <div className="text-sm text-gray-300">Wine Collector</div>
                </CardContent>
              </Card>
              
              <Card className="bg-wood-800 text-white border-none shadow-lg">
                <CardContent className="pt-8 px-6 pb-6">
                  <div className="flex mb-4">
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                  </div>
                  <p className="italic mb-4">
                    "The range of premium spirits is exceptional, and the service matches the quality. Truly world-class."
                  </p>
                  <div className="font-semibold">Sarah M.</div>
                  <div className="text-sm text-gray-300">Spirits Enthusiast</div>
                </CardContent>
              </Card>
              
              <Card className="bg-wood-800 text-white border-none shadow-lg">
                <CardContent className="pt-8 px-6 pb-6">
                  <div className="flex mb-4">
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                    <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
                  </div>
                  <p className="italic mb-4">
                    "M-Pesa payment was seamless and delivery was prompt. I'll definitely be shopping here again."
                  </p>
                  <div className="font-semibold">David N.</div>
                  <div className="text-sm text-gray-300">Loyal Customer</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-600 to-wood-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Premium Service</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you're a casual enthusiast or a serious collector, we have the perfect spirits waiting for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="xl" variant="hero" className="bg-wood-900 hover:bg-wood-950 border border-amber-500/50 shadow-lg">
                <Link to="/shop">Browse Collection</Link>
              </Button>
              <Button asChild size="xl" variant="heroOutline" className="border-2 border-white text-white hover:bg-white/10 shadow-lg">
                <Link to="/admin">Admin Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
