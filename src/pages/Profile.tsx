
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, Settings, ShoppingBag, CalendarRange } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center">
                <User className="h-12 w-12 text-amber-600" />
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 text-center">
                Member since {new Date().toLocaleDateString()}
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/profile/edit')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                My Orders
              </CardTitle>
              <CardDescription>
                View and track your recent orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>You don't have any orders yet.</p>
                <Button 
                  variant="link" 
                  className="text-amber-600"
                  onClick={() => navigate('/shop')}
                >
                  Browse our collection
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarRange className="mr-2 h-5 w-5" />
                My Pre-orders
              </CardTitle>
              <CardDescription>
                Manage your upcoming pre-orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>You don't have any pre-orders yet.</p>
                <Button 
                  variant="link" 
                  className="text-amber-600"
                  onClick={() => navigate('/prebook')}
                >
                  Pre-book spirits
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
