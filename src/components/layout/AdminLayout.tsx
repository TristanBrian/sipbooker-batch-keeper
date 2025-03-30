
import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/inventory', label: 'Inventory', icon: <Package size={20} /> },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { path: '/admin/payments', label: 'Payments', icon: <CreditCard size={20} /> },
    { path: '/admin/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/admin" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-sidebar-primary">Spirit Vault</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                location.pathname === item.path 
                  ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary-foreground'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={() => navigate('/')}
          >
            <ShoppingCart size={20} className="mr-2" />
            <span>View Store</span>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container p-4 md:p-6 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
