
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X, Plus, Upload, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface InventoryTableProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
}

const InventoryTable = ({ products, onUpdateProduct }: InventoryTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const { toast } = useToast();
  
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditValues(product);
  };
  
  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };
  
  const handleChange = (field: keyof Product, value: string | number) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload to a server/cloud storage
    // For demo purposes, we'll use a FileReader to get a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setEditValues(prev => ({ ...prev, image: imageUrl }));
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image uploaded",
      description: "The image has been uploaded and will be saved when you click Save.",
    });
  };
  
  const handleSave = (product: Product) => {
    const updatedProduct = { ...product, ...editValues };
    onUpdateProduct(updatedProduct);
    setEditingId(null);
    setEditValues({});
    setPreviewImage(null);
    
    toast({
      title: "Product updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    });
  };

  const handlePreviewImage = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setShowImagePreview(true);
  };
  
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price (KSH)</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded overflow-hidden">
                      <img 
                        src={editingId === product.id && previewImage ? previewImage : product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {editingId === product.id && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => document.getElementById(`image-upload-${product.id}`)?.click()}
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          <span className="sr-only md:not-sr-only md:inline-block">Upload</span>
                        </Button>
                        <input
                          id={`image-upload-${product.id}`}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    )}
                    {!editingId && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handlePreviewImage(product.image)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {editingId === product.id ? (
                    <Input
                      value={editValues.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="max-w-[200px]"
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <Input
                      value={editValues.category || ''}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="max-w-[150px]"
                    />
                  ) : (
                    product.category
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === product.id ? (
                    <Input
                      type="number"
                      value={editValues.price || 0}
                      onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                      className="max-w-[100px] ml-auto"
                    />
                  ) : (
                    `${product.price.toLocaleString()}`
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === product.id ? (
                    <Input
                      type="number"
                      value={editValues.stock || 0}
                      onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                      className="max-w-[100px] ml-auto"
                    />
                  ) : (
                    product.stock
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === product.id ? (
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleSave(product)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <div className="flex items-center justify-center">
              <img 
                src={previewImage} 
                alt="Product preview" 
                className="max-h-[400px] max-w-full object-contain rounded-md"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowImagePreview(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryTable;
