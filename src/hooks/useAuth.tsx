
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
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo credentials for testing (in a real app, these would be in a secure database)
const DEMO_ADMIN = { email: 'admin@maybachliquor.com', password: 'admin123' };
const DEMO_USER = { email: 'user@example.com', password: 'user123' };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('maybachLiquorUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('maybachLiquorUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulating API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Special case for admin login
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Admin User',
        email: DEMO_ADMIN.email,
        role: 'admin',
      };
      
      setUser(adminUser);
      localStorage.setItem('maybachLiquorUser', JSON.stringify(adminUser));
      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard!",
      });
      return true;
    }
    
    // Demo user login
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const regularUser: User = {
        id: 'user-1',
        name: 'Demo User',
        email: DEMO_USER.email,
        role: 'customer',
      };
      
      setUser(regularUser);
      localStorage.setItem('maybachLiquorUser', JSON.stringify(regularUser));
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      return true;
    }
    
    // Check in the existing users array
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('maybachLiquorUser', JSON.stringify(foundUser));
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
    localStorage.setItem('maybachLiquorUser', JSON.stringify(newUser));
    
    toast({
      title: "Account created",
      description: "Your account has been created successfully!",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('maybachLiquorUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('maybachLiquorUser', JSON.stringify(updatedUser));
    
    // Also update in the users array if it exists there
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex >= 0) {
      users[userIndex] = updatedUser;
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      isAdmin,
      updateUser
    }}>
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
