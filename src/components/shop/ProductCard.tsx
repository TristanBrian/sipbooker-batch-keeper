
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="product-card overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-1">{product.category}</p>
        <p className="font-medium text-lg">${product.price.toFixed(2)}</p>
        <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => addToCart(product, 1)}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/prebook/${product.id}`}>Pre-book</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
