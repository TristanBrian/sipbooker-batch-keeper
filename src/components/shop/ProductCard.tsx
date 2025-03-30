
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, CalendarClock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="product-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square relative overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        {product.featured && (
          <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link to={`/product/${product.id}`} className="text-white text-sm font-medium px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 transition-colors">
            View Details
          </Link>
        </div>
      </div>
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-1">{product.category}</p>
        <p className="font-medium text-lg">KSH {(product.price * 100).toLocaleString()}</p>
        <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => addToCart(product, 1)}
          disabled={product.stock <= 0}
          className={`flex-1 ${product.stock > 0 ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-gray-300'}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button variant="outline" size="sm" asChild className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50">
          <Link to={`/prebook/${product.id}`}>
            <CalendarClock className="mr-2 h-4 w-4" />
            Pre-book
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
