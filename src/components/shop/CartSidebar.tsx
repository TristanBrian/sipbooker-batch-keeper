
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  X,
  CalendarClock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const CartSidebar = () => {
  const { cartItems, removeFromCart, updateCartQuantity, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [checkingOut, setCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }
    
    setCheckingOut(true);
    setTimeout(() => {
      navigate('/checkout');
      setCheckingOut(false);
    }, 500);
  };
  
  const handlePrebook = () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before pre-booking.',
        variant: 'destructive',
      });
      return;
    }
    
    setCheckingOut(true);
    setTimeout(() => {
      navigate('/prebook');
      setCheckingOut(false);
    }, 500);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-1 py-4">
        <h2 className="text-xl font-semibold flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Your Cart
        </h2>
        {cartItems.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearCart}
            className="text-muted-foreground hover:text-destructive"
          >
            Clear
          </Button>
        )}
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-y-auto py-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-1">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add items to your cart to see them here.
            </p>
            <Button asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex items-start space-x-4 px-2">
                <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <>
          <Separator />
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full" 
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              Checkout
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={handlePrebook}
              disabled={checkingOut}
            >
              <CalendarClock className="mr-2 h-4 w-4" />
              Pre-book for Later
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
