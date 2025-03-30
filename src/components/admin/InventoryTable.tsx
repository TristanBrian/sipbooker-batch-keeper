
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
import { Pencil, Save, X, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface InventoryTableProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
}

const InventoryTable = ({ products, onUpdateProduct }: InventoryTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});
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
  
  const handleSave = (product: Product) => {
    const updatedProduct = { ...product, ...editValues };
    onUpdateProduct(updatedProduct);
    setEditingId(null);
    setEditValues({});
    
    toast({
      title: "Product updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    });
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
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
                  `$${product.price.toFixed(2)}`
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
  );
};

export default InventoryTable;
