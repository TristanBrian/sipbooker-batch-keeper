
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import InventoryTable from '@/components/admin/InventoryTable';
import { getProducts, updateProduct } from '@/lib/data';
import { Product } from '@/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Inventory = () => {
  const [products, setProducts] = useState(getProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newProductImage, setNewProductImage] = useState<string>('https://images.unsplash.com/photo-1594372830925-9aea3bd60a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    description: '',
    price: 0,
    stock: 0,
    image: newProductImage,
  });
  const { toast } = useToast();
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = updateProduct(updatedProduct);
    if (updated) {
      setProducts(getProducts());
    }
  };
  
  const handleNewProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload to a server/cloud storage
    // For demo purposes, we'll use a FileReader to get a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setNewProductImage(imageUrl);
      setNewProduct(prev => ({ ...prev, image: imageUrl }));
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image uploaded",
      description: "The image has been uploaded for the new product.",
    });
  };
  
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the product name and category.",
        variant: "destructive",
      });
      return;
    }
    
    const newId = (products.length + 1).toString();
    const productToAdd = {
      id: newId,
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      image: newProductImage,
    } as Product;
    
    const updated = updateProduct(productToAdd);
    if (updated) {
      setProducts(getProducts());
      setShowAddDialog(false);
      setNewProduct({
        name: '',
        category: '',
        description: '',
        price: 0,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1594372830925-9aea3bd60a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      });
      setNewProductImage('https://images.unsplash.com/photo-1594372830925-9aea3bd60a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
      
      toast({
        title: "Product added",
        description: `${productToAdd.name} has been added to inventory.`,
      });
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter the details for the new product. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right text-sm font-medium">
                    Category
                  </label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="price" className="text-right text-sm font-medium">
                    Price (KSH)
                  </label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="stock" className="text-right text-sm font-medium">
                    Stock
                  </label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="image" className="text-right text-sm font-medium">
                    Product Image
                  </label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-20 w-20 border rounded overflow-hidden">
                        <img 
                          src={newProductImage} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => document.getElementById('new-product-image')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <input
                        id="new-product-image"
                        type="file"
                        accept="image/*"
                        onChange={handleNewProductImageChange}
                        className="hidden"
                      />
                    </div>
                    <Input
                      placeholder="Or enter image URL"
                      value={typeof newProduct.image === 'string' ? newProduct.image : ''}
                      onChange={(e) => {
                        setNewProduct({...newProduct, image: e.target.value});
                        setNewProductImage(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="description" className="text-right text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Save Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Select 
              value={categoryFilter} 
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
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
        
        <InventoryTable 
          products={filteredProducts}
          onUpdateProduct={handleUpdateProduct}
        />
        
        <div className="bg-amber-50 p-4 rounded-md mt-8">
          <h3 className="font-medium mb-2">Admin Privileges</h3>
          <ul className="text-sm space-y-1 list-disc pl-5">
            <li>Add new products to inventory</li>
            <li>Update product details including name, category, and price</li>
            <li>Upload and change product images</li>
            <li>Manage stock levels</li>
            <li>View detailed product information</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Inventory;
