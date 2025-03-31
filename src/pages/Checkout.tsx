
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { Phone, CreditCard, CheckCircle2, ArrowLeft, ShoppingBag, CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  paymentMethod: z.enum(["mpesa", "card"], {
    required_error: "Please select a payment method.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [paymentStep, setPaymentStep] = useState(1);

  // Initialize form with user data if available
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      paymentMethod: "mpesa",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    if (data.paymentMethod === "mpesa") {
      setPaymentStep(2);
    } else {
      // For cards, just process directly
      processPayment(data);
    }
  };

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
      
      // Simulate successful payment
      setTimeout(() => {
        setPaymentStep(3);
        setIsProcessing(false);
      }, 3000);
    }, 2000);
  };

  const processPayment = (data: FormValues) => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully!",
      });
      clearCart();
      setPaymentStep(3);
      setIsProcessing(false);
    }, 2000);
  };

  const handleCompleteOrder = () => {
    navigate("/profile");
  };

  // If cart is empty, redirect to shop
  if (cartItems.length === 0 && paymentStep === 1) {
    return (
      <div className="container max-w-4xl py-16 px-4">
        <Card className="text-center p-8">
          <div className="flex flex-col items-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">
              Add items to your cart before proceeding to checkout.
            </p>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {paymentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>
                  Please fill in your details to continue with the checkout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="254712345678" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your phone number starting with country code
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="mpesa" />
                                </FormControl>
                                <FormLabel className="font-normal flex items-center">
                                  <Phone className="h-5 w-5 mr-2 text-green-600" />
                                  M-Pesa
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="card" />
                                </FormControl>
                                <FormLabel className="font-normal flex items-center">
                                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                                  Credit/Debit Card
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-amber-600 hover:bg-amber-700"
                    >
                      Proceed to Payment
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {paymentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>M-Pesa Payment</CardTitle>
                <CardDescription>
                  Enter your M-Pesa number to receive payment prompt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMpesaSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="mpesa-number">M-Pesa Number</FormLabel>
                    <Input
                      id="mpesa-number"
                      type="tel"
                      placeholder="254712345678"
                      value={mpesaNumber}
                      onChange={(e) => setMpesaNumber(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter your M-Pesa number starting with country code (254)
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Phone className="mr-2 h-5 w-5" />
                        Pay with M-Pesa
                      </div>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => setPaymentStep(1)}
                    disabled={isProcessing}
                  >
                    Back to Checkout
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {paymentStep === 3 && (
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                <CardDescription>
                  Your order has been placed successfully
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-muted-foreground mb-2">Order Reference</p>
                  <p className="font-mono font-medium">ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                </div>
                <p className="text-center text-muted-foreground">
                  Thank you for your purchase! You will receive an email confirmation shortly.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleCompleteOrder} 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  View Order in Profile
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between py-2">
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0 mr-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">
                      KSH {((item.product.price * 100) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>KSH {(cartTotal * 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>KSH 0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>KSH {(cartTotal * 0.16 * 100).toLocaleString()}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>KSH {((cartTotal + cartTotal * 0.16) * 100).toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                variant="outline"
                className="w-full border-amber-600 text-amber-600 hover:bg-amber-50"
                onClick={() => navigate('/prebook')}
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                Switch to Pre-booking
              </Button>
              <Button
                variant="link"
                onClick={() => navigate('/shop')}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
