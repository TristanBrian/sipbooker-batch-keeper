
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, User, LogIn, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import CartSidebar from '../shop/CartSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            {isAdmin() && (
              <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                Admin
              </Link>
            )}
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
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  My Orders
                </DropdownMenuItem>
                {isAdmin() && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          )}
          
          {isAdmin() && user && (
            <Link to="/admin">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Admin
              </Button>
            </Link>
          )}
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
            {isAdmin() && (
              <Link to="/admin" className="py-2 text-sm font-medium hover:text-primary" onClick={() => setIsNavOpen(false)}>
                Admin
              </Link>
            )}
            {user ? (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsNavOpen(false);
                }}
                className="py-2 text-sm font-medium text-left hover:text-red-500"
              >
                <LogOut className="mr-2 inline-block h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link to="/login" className="py-2 text-sm font-medium hover:text-primary" onClick={() => setIsNavOpen(false)}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
