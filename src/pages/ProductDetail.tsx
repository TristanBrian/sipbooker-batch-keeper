
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProduct, getProducts } from '@/lib/data';
import { useCart } from '@/hooks/useCart';
import { CalendarClock, Minus, Plus, ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || '');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  // Get related products (same category)
  const relatedProducts = getProducts()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={`/shop/category/${product.category}`}>{product.category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Featured
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
              
              <div className="text-2xl font-semibold mb-6">KSH {product.price.toLocaleString()}</div>
              
              <div className="mb-6">
                <p className="text-md mb-4">{product.description}</p>
                
                <div className="flex items-center space-x-1 text-sm">
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.stock > 0 && (
                    <>
                      <span className="text-muted-foreground mx-2">•</span>
                      <span className="text-muted-foreground">{product.stock} available</span>
                    </>
                  )}
                </div>
              </div>
              
              {product.stock > 0 && (
                <>
                  <div className="flex items-center mb-6">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="hover:bg-muted/80"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleQuantityChange(1)}
                      className="hover:bg-muted/80"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button asChild size="lg" variant="outline" className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50">
                      <Link to={`/prebook/${product.id}`}>
                        <CalendarClock className="mr-2 h-5 w-5" />
                        Pre-book
                      </Link>
                    </Button>
                  </div>
                </>
              )}
              
              {product.stock <= 0 && (
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="w-full"
                >
                  <Link to={`/prebook/${product.id}`}>
                    <CalendarClock className="mr-2 h-5 w-5" />
                    Notify Me When Available
                  </Link>
                </Button>
              )}

              <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Checkout Options</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <ShoppingCart className="h-5 w-5 mt-0.5 mr-3 text-amber-600" />
                    <div>
                      <p className="font-medium">Express Checkout</p>
                      <p className="text-sm text-muted-foreground">Add to cart and proceed to checkout</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CalendarClock className="h-5 w-5 mt-0.5 mr-3 text-amber-600" />
                    <div>
                      <p className="font-medium">Pre-book for Later</p>
                      <p className="text-sm text-muted-foreground">Reserve your product for future pickup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-8 relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-amber-600 after:left-0 after:bottom-0">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
