
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts } from '@/lib/data';
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

const Shop = () => {
  const allProducts = getProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(allProducts.map(product => product.category))];
  
  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Shop Our Collection</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
              Explore our selection of premium spirits and liquors. Pre-book your favorite bottles or purchase directly from our inventory.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search spirits, wines, and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-background border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>
              </div>
              
              <div>
                <Select 
                  value={categoryFilter} 
                  onValueChange={(value) => setCategoryFilter(value)}
                >
                  <SelectTrigger className="h-12 border-amber-200 focus:ring-amber-500">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
                  <p className="text-sm">
                    <span className="font-medium">Currency:</span> Kenyan Shilling (KSH)
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="py-8 px-6 bg-amber-50 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Pre-book Your Premium Selection</h2>
            <p className="mb-4">
              Reserved bottles are held for pickup at your chosen date and time. Payment is made at collection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-semibold mb-2">Reserve Early</h3>
                <p>Secure your favorite spirits before they sell out</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-semibold mb-2">Choose Your Date</h3>
                <p>Select a convenient pickup time that works for you</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-semibold mb-2">Pay Later</h3>
                <p>No payment needed until you collect your order</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
