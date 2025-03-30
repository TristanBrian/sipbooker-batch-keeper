
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const PreBookConfirmation = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Pre-booking Confirmed!</h1>
            
            <p className="text-lg mb-8">
              Your order has been successfully pre-booked. We'll have your items ready for pickup on your selected date.
            </p>
            
            <div className="bg-muted/50 p-6 rounded-lg mb-8">
              <h2 className="font-semibold mb-4">What happens next?</h2>
              <ol className="text-left space-y-2 text-muted-foreground">
                <li>1. You'll receive a confirmation email with your order details.</li>
                <li>2. We'll prepare your order for your selected pickup date.</li>
                <li>3. You'll receive a reminder the day before your pickup.</li>
                <li>4. Bring a valid ID for pickup and payment.</li>
              </ol>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreBookConfirmation;
