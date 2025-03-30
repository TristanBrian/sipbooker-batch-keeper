
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";

interface MpesaTransactionProps {
  id: string;
  customerName: string;
  amount: number;
  phone: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
}

export function MpesaTransaction({ transaction }: { transaction: MpesaTransactionProps }) {
  return (
    <div className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
      <div>
        <p className="font-medium">{transaction.customerName}</p>
        <p className="text-sm text-muted-foreground">
          {transaction.phone} • {new Date(transaction.timestamp).toLocaleString()}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">KSH {transaction.amount.toLocaleString()}</p>
        <Badge className={`
          ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
            transaction.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
            'bg-red-100 text-red-800'}
        `}>
          {transaction.status}
        </Badge>
      </div>
    </div>
  );
}

export function MpesaPaymentInfo() {
  // Sample M-Pesa transactions
  const recentTransactions = [
    {
      id: "MPE12345",
      customerName: "John Kamau",
      amount: 2500,
      phone: "254712345678",
      status: 'completed' as const,
      timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    },
    {
      id: "MPE12346",
      customerName: "Mary Wanjiku",
      amount: 5000,
      phone: "254723456789",
      status: 'pending' as const,
      timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    },
    {
      id: "MPE12347",
      customerName: "David Ochieng",
      amount: 3200,
      phone: "254734567890",
      status: 'completed' as const,
      timestamp: new Date(Date.now() - 10800000).toISOString() // 3 hours ago
    },
    {
      id: "MPE12348",
      customerName: "Sarah Njeri",
      amount: 1800,
      phone: "254745678901",
      status: 'failed' as const,
      timestamp: new Date(Date.now() - 14400000).toISOString() // 4 hours ago
    }
  ];

  const totalAmount = recentTransactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">M-Pesa Payments</CardTitle>
        <Phone className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">KSH {totalAmount.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground mt-1 mb-4">
          Last 24 hours
        </p>
        <div className="space-y-4">
          {recentTransactions.map(transaction => (
            <MpesaTransaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
