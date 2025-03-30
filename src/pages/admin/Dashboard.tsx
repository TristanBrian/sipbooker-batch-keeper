
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getOrders, getProducts } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  CreditCard, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const orders = getOrders();
  const products = getProducts();
  
  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalRevenue = orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((total, order) => total + order.totalAmount, 0);
  const lowStockItems = products.filter(product => product.stock < 10).length;
  
  // Calculate sales by category
  const salesByCategory = products.reduce((acc, product) => {
    const orderItems = orders.flatMap(order => order.items);
    const soldItems = orderItems.filter(item => item.productId === product.id);
    const categoryTotal = soldItems.reduce((total, item) => total + (item.quantity * item.product.price), 0);
    
    if (!acc[product.category]) {
      acc[product.category] = 0;
    }
    acc[product.category] += categoryTotal;
    return acc;
  }, {} as Record<string, number>);
  
  const salesChartData = Object.entries(salesByCategory).map(([name, amount]) => ({
    name,
    amount
  }));
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/admin/orders">View Orders</Link>
            </Button>
            <Button asChild>
              <Link to="/admin/inventory">Manage Inventory</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {pendingOrders} pending orders
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From paid orders
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {lowStockItems} items low on stock
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Popular Category</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {salesChartData.length > 0 
                  ? salesChartData.sort((a, b) => b.amount - a.amount)[0].name 
                  : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on sales volume
              </p>
            </CardContent>
          </Card>
        </div>
        
        {lowStockItems > 0 && (
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
              <CardTitle className="text-sm font-medium">Inventory Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {lowStockItems} items are running low on stock. <Link to="/admin/inventory" className="font-medium text-amber-600 hover:underline">Review inventory</Link>
              </p>
            </CardContent>
          </Card>
        )}
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Sales']}
                  />
                  <Bar dataKey="amount" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">#{order.id} - {order.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                        <span className={`text-xs ${
                          order.status === 'completed' ? 'text-green-600' : 
                          order.status === 'cancelled' ? 'text-red-600' : 
                          'text-amber-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No orders yet</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockItems > 0 ? (
                <div className="space-y-4">
                  {products
                    .filter(product => product.stock < 10)
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${
                            product.stock === 0 ? 'text-red-600' : 
                            product.stock < 5 ? 'text-amber-600' : 
                            'text-muted-foreground'
                          }`}>
                            {product.stock} in stock
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">All products have sufficient stock</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
