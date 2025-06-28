
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

interface Product {
  barcode: string;
  name: string;
  price: number;
  stock: number;
}

interface ProductListProps {
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (barcode: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEditProduct, onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock product data - in real app this would come from database
  const [products] = useState<Product[]>([
    { barcode: '123456789', name: 'Milk 1L', price: 2.50, stock: 45 },
    { barcode: '987654321', name: 'Bread Loaf', price: 1.75, stock: 23 },
    { barcode: '555666777', name: 'Bananas (per kg)', price: 3.20, stock: 156 },
    { barcode: '111222333', name: 'Orange Juice 500ml', price: 4.25, stock: 12 },
    { barcode: '444555666', name: 'Eggs (12 pack)', price: 3.85, stock: 38 },
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <div className="mt-4">
          <Input
            placeholder="Search by name or barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Barcode</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.barcode}>
                <TableCell className="font-mono">{product.barcode}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <span className={`${
                    product.stock < 20 ? 'text-red-600 font-semibold' : 
                    product.stock < 50 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditProduct?.(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteProduct?.(product.barcode)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
