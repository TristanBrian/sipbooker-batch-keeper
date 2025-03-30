
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from '@/types';
import { MoreHorizontal, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
}

const OrdersTable = ({ 
  orders, 
  onViewOrder, 
  onUpdateOrderStatus,
  onUpdatePaymentStatus
}: OrdersTableProps) => {
  const { toast } = useToast();
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'ready': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return '';
    }
  };
  
  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return '';
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };
  
  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    onUpdateOrderStatus(orderId, status);
    toast({
      title: "Order status updated",
      description: `Order #${orderId} status changed to ${status}.`,
    });
  };
  
  const handleUpdatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    onUpdatePaymentStatus(orderId, status);
    toast({
      title: "Payment status updated",
      description: `Order #${orderId} payment status changed to ${status}.`,
    });
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getPaymentStatusColor(order.paymentStatus)}>
                  {order.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewOrder(order.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewOrder(order.id)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, 'pending')}
                        disabled={order.status === 'pending'}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                        disabled={order.status === 'confirmed'}
                      >
                        Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, 'ready')}
                        disabled={order.status === 'ready'}
                      >
                        Ready for Pickup
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, 'completed')}
                        disabled={order.status === 'completed'}
                      >
                        Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                        disabled={order.status === 'cancelled'}
                      >
                        Cancelled
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                      <DropdownMenuItem 
                        onClick={() => handleUpdatePaymentStatus(order.id, 'pending')}
                        disabled={order.paymentStatus === 'pending'}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdatePaymentStatus(order.id, 'paid')}
                        disabled={order.paymentStatus === 'paid'}
                      >
                        Paid
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
