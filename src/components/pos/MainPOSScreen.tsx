
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Barcode, Plus, Minus, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
}

interface MainPOSScreenProps {
  onCheckout: (total: number, items: Product[]) => void;
  onWeighingRequired: (product: Product) => void;
}

const MainPOSScreen: React.FC<MainPOSScreenProps> = ({ onCheckout, onWeighingRequired }) => {
  const [barcode, setBarcode] = useState('');
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (barcodeInput: string) => {
    // Mock product lookup - in real app this would be from database
    const mockProducts = {
      '123456789': { name: 'Milk 1L', price: 2.50, requiresWeighing: false },
      '987654321': { name: 'Bread Loaf', price: 1.75, requiresWeighing: false },
      '555666777': { name: 'Bananas (per kg)', price: 3.20, requiresWeighing: true },
    };

    const productData = mockProducts[barcodeInput as keyof typeof mockProducts];
    if (productData) {
      const existingItem = cart.find(item => item.barcode === barcodeInput);
      
      if (existingItem) {
        updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        const newProduct: Product = {
          id: Date.now().toString(),
          barcode: barcodeInput,
          name: productData.name,
          price: productData.price,
          quantity: 1
        };
        
        if (productData.requiresWeighing) {
          onWeighingRequired(newProduct);
        } else {
          setCart([...cart, newProduct]);
        }
      }
      setBarcode('');
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode.trim()) {
      addToCart(barcode.trim());
    }
  };

  return (
    <div className="h-screen bg-gray-50 p-4 flex flex-col">
      {/* Header with Barcode Input */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Barcode className="h-6 w-6" />
            Barcode Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBarcodeSubmit} className="flex gap-2">
            <Input
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Scan or enter barcode..."
              className="text-lg h-12"
              autoFocus
            />
            <Button type="submit" size="lg" className="px-8">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Cart Section */}
      <Card className="flex-1 mb-4">
        <CardHeader>
          <CardTitle>Shopping Cart ({cart.length} items)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Cart is empty. Scan items to add them.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="text-xl font-semibold min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  
                  <div className="text-right min-w-[5rem]">
                    <div className="text-lg font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-10 w-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Total and Checkout */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-3xl font-bold text-green-600">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          
          <Button
            size="lg"
            className="w-full h-16 text-xl"
            disabled={cart.length === 0}
            onClick={() => onCheckout(calculateTotal(), cart)}
          >
            Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainPOSScreen;
