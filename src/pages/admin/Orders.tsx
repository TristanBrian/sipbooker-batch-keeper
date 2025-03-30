
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import OrdersTable from '@/components/admin/OrdersTable';
import { getOrder, getOrders, updateOrder } from '@/lib/data';
import { Order } from '@/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';
import { format } from 'date-fns';

const Orders = () => {
  const [orders, setOrders] = useState(getOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  
  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchQuery) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleViewOrder = (orderId: string) => {
    const order = getOrder(orderId);
    if (order) {
      setViewingOrder(order);
    }
  };
  
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const order = getOrder(orderId);
    if (order) {
      const updatedOrder = { ...order, status };
      updateOrder(updatedOrder);
      setOrders(getOrders());
      
      if (viewingOrder && viewingOrder.id === orderId) {
        setViewingOrder(updatedOrder);
      }
    }
  };
  
  const handleUpdatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
    const order = getOrder(orderId);
    if (order) {
      const updatedOrder = { ...order, paymentStatus };
      updateOrder(updatedOrder);
      setOrders(getOrders());
      
      if (viewingOrder && viewingOrder.id === orderId) {
        setViewingOrder(updatedOrder);
      }
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Order Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="ready">Ready for Pickup</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <OrdersTable 
          orders={filteredOrders}
          onViewOrder={handleViewOrder}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onUpdatePaymentStatus={handleUpdatePaymentStatus}
        />
        
        {/* Order Detail Dialog */}
        {viewingOrder && (
          <Dialog open={!!viewingOrder} onOpenChange={(open) => !open && setViewingOrder(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Order #{viewingOrder.id} Details</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {viewingOrder.customerName}</p>
                    <p><span className="font-medium">Email:</span> {viewingOrder.customerEmail}</p>
                    <p><span className="font-medium">Phone:</span> {viewingOrder.customerPhone}</p>
                    <p><span className="font-medium">Order Date:</span> {format(new Date(viewingOrder.createdAt), 'PPP')}</p>
                    {viewingOrder.pickupDate && (
                      <p><span className="font-medium">Pickup Date:</span> {format(new Date(viewingOrder.pickupDate), 'PPP')}</p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Order Status</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm mb-1">Order Status</p>
                        <Select 
                          value={viewingOrder.status} 
                          onValueChange={(value: Order['status']) => handleUpdateOrderStatus(viewingOrder.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="ready">Ready for Pickup</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <p className="text-sm mb-1">Payment Status</p>
                        <Select 
                          value={viewingOrder.paymentStatus} 
                          onValueChange={(value: Order['paymentStatus']) => handleUpdatePaymentStatus(viewingOrder.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {viewingOrder.items.map((item) => (
                      <div key={item.productId} className="flex border-b pb-2 last:border-0">
                        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-3">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Total</p>
                      <p className="text-xl font-bold">${viewingOrder.totalAmount.toFixed(2)}</p>
                    </div>
                    {viewingOrder.paymentMethod && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Payment Method: {viewingOrder.paymentMethod}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={() => setViewingOrder(null)}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;
