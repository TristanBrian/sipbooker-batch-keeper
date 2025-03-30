
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, Search, ArrowUpDown, Download, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface MpesaTransaction {
  id: string;
  customerName: string;
  phone: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  orderRef: string;
  timestamp: string;
}

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Sample M-Pesa transactions
  const transactions: MpesaTransaction[] = [
    {
      id: "MPE12345",
      customerName: "John Kamau",
      phone: "254712345678",
      amount: 2500,
      status: 'completed',
      orderRef: "ORD-2501",
      timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    },
    {
      id: "MPE12346",
      customerName: "Mary Wanjiku",
      phone: "254723456789",
      amount: 5000,
      status: 'pending',
      orderRef: "ORD-2502",
      timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    },
    {
      id: "MPE12347",
      customerName: "David Ochieng",
      phone: "254734567890",
      amount: 3200,
      status: 'completed',
      orderRef: "ORD-2503",
      timestamp: new Date(Date.now() - 10800000).toISOString() // 3 hours ago
    },
    {
      id: "MPE12348",
      customerName: "Sarah Njeri",
      phone: "254745678901",
      amount: 1800,
      status: 'failed',
      orderRef: "ORD-2504",
      timestamp: new Date(Date.now() - 14400000).toISOString() // 4 hours ago
    },
    {
      id: "MPE12349",
      customerName: "Peter Mwangi",
      phone: "254756789012",
      amount: 4200,
      status: 'completed',
      orderRef: "ORD-2505",
      timestamp: new Date(Date.now() - 18000000).toISOString() // 5 hours ago
    },
    {
      id: "MPE12350",
      customerName: "Elizabeth Atieno",
      phone: "254767890123",
      amount: 6000,
      status: 'completed',
      orderRef: "ORD-2506",
      timestamp: new Date(Date.now() - 21600000).toISOString() // 6 hours ago
    },
    {
      id: "MPE12351",
      customerName: "Michael Gitonga",
      phone: "254778901234",
      amount: 3500,
      status: 'pending',
      orderRef: "ORD-2507",
      timestamp: new Date(Date.now() - 25200000).toISOString() // 7 hours ago
    },
    {
      id: "MPE12352",
      customerName: "Lucy Waithera",
      phone: "254789012345",
      amount: 2800,
      status: 'completed',
      orderRef: "ORD-2508",
      timestamp: new Date(Date.now() - 28800000).toISOString() // 8 hours ago
    }
  ];
  
  // Calculate summary statistics
  const totalAmount = transactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const pendingAmount = transactions
    .filter(tx => tx.status === 'pending')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const failedAmount = transactions
    .filter(tx => tx.status === 'failed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  // Filter transactions based on search and status
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.phone.includes(searchQuery) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.orderRef.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort transactions by timestamp
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">M-Pesa Payments</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Received</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSH {totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From {transactions.filter(tx => tx.status === 'completed').length} completed transactions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Phone className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSH {pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From {transactions.filter(tx => tx.status === 'pending').length} pending transactions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <Phone className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSH {failedAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From {transactions.filter(tx => tx.status === 'failed').length} failed transactions
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer, phone, ID or order reference..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">
                      <Button variant="ghost" size="sm" onClick={toggleSortOrder} className="font-medium">
                        Date/Time
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-left p-4">Transaction ID</th>
                    <th className="text-left p-4">Customer</th>
                    <th className="text-left p-4">Phone</th>
                    <th className="text-left p-4">Order Ref</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        {format(new Date(transaction.timestamp), 'dd MMM yyyy')}
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(transaction.timestamp), 'h:mm a')}
                        </div>
                      </td>
                      <td className="p-4 font-mono text-sm">{transaction.id}</td>
                      <td className="p-4">{transaction.customerName}</td>
                      <td className="p-4">{transaction.phone}</td>
                      <td className="p-4">{transaction.orderRef}</td>
                      <td className="p-4 font-medium">KSH {transaction.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <Badge className={`
                          ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {transaction.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {sortedTransactions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-muted-foreground">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Payments;
