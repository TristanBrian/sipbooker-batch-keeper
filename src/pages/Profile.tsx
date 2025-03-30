
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, ShoppingBag, CalendarRange, Phone, CreditCard, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }

  // Mock order data
  const orders = [
    {
      id: "ORD-2501",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      status: "completed",
      amount: 5500,
      items: ["Glenfiddich 12 Year", "Jameson Irish Whiskey"]
    },
    {
      id: "ORD-2342",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      status: "completed",
      amount: 3200,
      items: ["Macallan 12 Year"]
    }
  ];

  // Mock preorder data
  const preorders = [
    {
      id: "PRE-1234",
      product: "Macallan Rare Cask",
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days in future
      status: "confirmed",
      deposit: 2000,
      totalAmount: 12000
    }
  ];

  const handleMpesaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mpesaNumber) {
      toast({
        title: "Error",
        description: "Please enter a valid M-Pesa number",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate M-Pesa payment request
    setTimeout(() => {
      toast({
        title: "Payment Request Sent",
        description: "Check your phone for the M-Pesa payment prompt.",
      });
      setIsProcessing(false);
    }, 2000);
  };

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
                Member since {format(new Date(), "MMMM yyyy")}
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
                  className="w-full justify-start"
                  onClick={() => navigate('/prebook')}
                >
                  <CalendarRange className="mr-2 h-4 w-4" />
                  Pre-book Spirits
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

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-amber-600" />
                M-Pesa Quick Pay
              </CardTitle>
              <CardDescription>
                Link your M-Pesa number for faster checkout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMpesaSubmit}>
                <div className="mb-4">
                  <Input
                    type="tel"
                    placeholder="Your M-Pesa number (e.g., 254712345678)"
                    value={mpesaNumber}
                    onChange={(e) => setMpesaNumber(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Phone className="mr-2 h-4 w-4" />
                      Link M-Pesa
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="preorders">Pre-orders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Order History
                  </CardTitle>
                  <CardDescription>
                    View and track your recent orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="p-4 md:w-2/3">
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center">
                                  <h3 className="font-semibold">Order #{order.id}</h3>
                                  <Badge className="ml-2 bg-green-100 text-green-800">
                                    {order.status}
                                  </Badge>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {format(order.date, "dd MMM yyyy")}
                                </span>
                              </div>
                              <div className="text-sm space-y-1">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between">
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="bg-muted p-4 md:w-1/3 flex flex-col justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                                <p className="font-bold text-lg">KSH {order.amount.toLocaleString()}</p>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-4"
                                onClick={() => navigate(`/order/${order.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>You don't have any orders yet.</p>
                      <Button 
                        variant="link" 
                        className="text-amber-600"
                        onClick={() => navigate('/shop')}
                      >
                        Browse our collection
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button variant="outline" onClick={() => navigate('/shop')}>
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preorders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarRange className="mr-2 h-5 w-5" />
                    Pre-orders
                  </CardTitle>
                  <CardDescription>
                    Manage your upcoming pre-orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {preorders.length > 0 ? (
                    <div className="space-y-4">
                      {preorders.map((preorder) => (
                        <Card key={preorder.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="p-4 md:w-2/3">
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center">
                                  <h3 className="font-semibold">{preorder.product}</h3>
                                  <Badge className="ml-2 bg-amber-100 text-amber-800">
                                    {preorder.status}
                                  </Badge>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  Ready: {format(preorder.date, "dd MMM yyyy")}
                                </span>
                              </div>
                              <div className="text-sm space-y-1">
                                <div className="flex justify-between">
                                  <span>Reference:</span>
                                  <span className="font-mono">{preorder.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Deposit Paid:</span>
                                  <span>KSH {preorder.deposit.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Balance Due:</span>
                                  <span>KSH {(preorder.totalAmount - preorder.deposit).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-muted p-4 md:w-1/3 flex flex-col justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                                <p className="font-bold text-lg">KSH {preorder.totalAmount.toLocaleString()}</p>
                              </div>
                              <div className="space-y-2 mt-4">
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="w-full bg-amber-600 hover:bg-amber-700"
                                >
                                  <Phone className="mr-2 h-4 w-4" />
                                  Pay Balance
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full"
                                  onClick={() => navigate(`/prebook/${preorder.id}`)}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarRange className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>You don't have any pre-orders yet.</p>
                      <Button 
                        variant="link" 
                        className="text-amber-600"
                        onClick={() => navigate('/prebook')}
                      >
                        Pre-book spirits
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                    onClick={() => navigate('/prebook')}
                  >
                    <CalendarRange className="mr-2 h-4 w-4" />
                    Browse Pre-booking Options
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Manage your payment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Phone className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium">M-Pesa</p>
                      <p className="text-sm text-muted-foreground">Pay directly with your mobile money</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Preferred</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">Pay with your bank card</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Add Card</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
