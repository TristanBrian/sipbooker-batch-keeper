
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, User, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartSidebar from '../shop/CartSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsNavOpen(!isNavOpen)} className="mr-2">
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Spirit Vault</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/prebook" className="text-sm font-medium hover:text-primary transition-colors">
              Pre-book
            </Link>
            <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>
        )}

        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] sm:w-[450px]">
              <CartSidebar />
            </SheetContent>
          </Sheet>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          
          <Link to="/admin">
            <Button variant="default" size="sm" className="hidden md:flex">
              <LogIn className="mr-2 h-4 w-4" /> Admin
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && isNavOpen && (
        <div className="md:hidden bg-background border-b">
          <nav className="flex flex-col px-4 py-2">
            <Link to="/" className="py-2 text-sm font-medium hover:text-primary" onClick={() => setIsNavOpen(false)}>
              Home
            </Link>
            <Link to="/shop" className="py-2 text-sm font-medium hover:text-primary" onClick={() => setIsNavOpen(false)}>
              Shop
            </Link>
            <Link to="/prebook" className="py-2 text-sm font-medium hover:text-primary" onClick={() => setIsNavOpen(false)}>
              Pre-book
            </Link>
            <Link to="/admin" className="py-2 text-sm font-medium hover:text-primary" onClick={() => setIsNavOpen(false)}>
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
