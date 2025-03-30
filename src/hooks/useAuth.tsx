
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { users } from '@/lib/data';
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('spiritVaultUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('spiritVaultUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulating API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, you would validate against backend
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('spiritVaultUser', JSON.stringify(foundUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulating API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      toast({
        title: "Signup failed",
        description: "An account with this email already exists",
        variant: "destructive",
      });
      return false;
    }
    
    // Create new user (in real app, this would be a backend call)
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      role: 'customer', // Default role
    };
    
    // Add to users array (this is just for demo, in real app would persist to DB)
    users.push(newUser);
    
    // Set as current user
    setUser(newUser);
    localStorage.setItem('spiritVaultUser', JSON.stringify(newUser));
    
    toast({
      title: "Account created",
      description: "Your account has been created successfully!",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spiritVaultUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
