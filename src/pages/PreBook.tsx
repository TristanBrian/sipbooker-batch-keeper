
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getProduct, getProducts, createOrder } from '@/lib/data';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Valid phone number is required"),
  pickupDate: z.date({
    required_error: "Pickup date is required",
  }).refine(date => date > new Date(), {
    message: "Pickup date must be in the future",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PreBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { toast } = useToast();
  
  // If id is provided, get the specific product
  const product = id ? getProduct(id) : null;
  const products = product ? [product] : getProducts();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });
  
  const onSubmit = (values: FormValues) => {
    const items = product 
      ? [{ productId: product.id, quantity: 1, product }]
      : cartItems;
    
    if (items.length === 0) {
      toast({
        title: "No items selected",
        description: "Please add items to your cart or select a product to pre-book.",
        variant: "destructive",
      });
      return;
    }
    
    const totalAmount = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    
    const newOrder = createOrder({
      customerName: values.name,
      customerEmail: values.email,
      customerPhone: values.phone,
      items,
      status: 'pending',
      totalAmount,
      paymentStatus: 'pending',
      pickupDate: values.pickupDate.toISOString(),
    });
    
    toast({
      title: "Pre-booking successful!",
      description: `Your order #${newOrder.id} has been placed for pickup on ${format(values.pickupDate, 'PPP')}.`,
    });
    
    clearCart();
    navigate('/prebook/confirmation');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pre-book Your Order</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>
                      Fill in your details to pre-book your order.
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="you@example.com" type="email" {...field} />
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
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="pickupDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Pickup Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Instructions</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Any special requirements or notes for your order"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          Submit Pre-booking
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product ? (
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="font-medium mt-1">KSH {product.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ) : cartItems.length > 0 ? (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.productId} className="flex items-start space-x-3">
                            <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity} x KSH {item.product.price.toLocaleString()}
                              </p>
                              <p className="font-medium mt-1">
                                KSH {(item.quantity * item.product.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center">
                        No items selected for pre-booking.
                      </p>
                    )}
                  </CardContent>
                  {(product || cartItems.length > 0) && (
                    <CardFooter className="flex justify-between border-t pt-4">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">
                        KSH {product 
                          ? product.price.toLocaleString()
                          : cartItems.reduce(
                              (total, item) => total + (item.product.price * item.quantity),
                              0
                            ).toLocaleString()}
                      </span>
                    </CardFooter>
                  )}
                </Card>
                
                <p className="mt-4 text-sm text-muted-foreground">
                  Pre-booking allows you to reserve your selection for pickup on your chosen date. Payment will be required at pickup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreBook;
