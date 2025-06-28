
import React, { useState } from 'react';
import MainPOSScreen from '@/components/pos/MainPOSScreen';
import CheckoutModal from '@/components/pos/CheckoutModal';
import WeighingScaleDialog from '@/components/pos/WeighingScaleDialog';
import ReceiptDisplay from '@/components/pos/ReceiptDisplay';
import ProductList from '@/components/pos/ProductList';
import NumericKeypad from '@/components/pos/NumericKeypad';
import LoginScreen from '@/components/pos/LoginScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
}

const POSDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showWeighing, setShowWeighing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{ total: number; items: Product[] }>({ total: 0, items: [] });
  const [weighingProduct, setWeighingProduct] = useState<Product | null>(null);
  const [lastReceipt, setLastReceipt] = useState<any>(null);
  const [keypadValue, setKeypadValue] = useState('');

  const handleLogin = async (username: string, password: string) => {
    // Mock login - in real app this would authenticate against a server
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleCheckout = (total: number, items: Product[]) => {
    setCheckoutData({ total, items });
    setShowCheckout(true);
  };

  const handleWeighingRequired = (product: Product) => {
    setWeighingProduct(product);
    setShowWeighing(true);
  };

  const handleWeighingConfirm = (weight: number, totalPrice: number) => {
    if (weighingProduct) {
      // Add weighted product to cart logic would go here
      console.log(`Added ${weight}kg of ${weighingProduct.name} for $${totalPrice.toFixed(2)}`);
    }
  };

  const handlePaymentConfirm = (amountPaid: number, change: number) => {
    const receipt = {
      storeName: "SuperMart POS Demo",
      transactionDate: new Date(),
      items: checkoutData.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      totalAmount: checkoutData.total,
      amountPaid,
      change
    };
    
    setLastReceipt(receipt);
    setShowCheckout(false);
    setShowReceipt(true);
  };

  const handleKeypadNumber = (number: string) => {
    setKeypadValue(prev => prev + number);
  };

  const handleKeypadDelete = () => {
    setKeypadValue(prev => prev.slice(0, -1));
  };

  const handleKeypadEnter = () => {
    console.log('Keypad entered:', keypadValue);
    setKeypadValue('');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs defaultValue="pos" className="w-full">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pos">POS System</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="pos" className="mt-0">
          <MainPOSScreen
            onCheckout={handleCheckout}
            onWeighingRequired={handleWeighingRequired}
          />
        </TabsContent>

        <TabsContent value="products" className="p-4">
          <ProductList
            onEditProduct={(product) => console.log('Edit product:', product)}
            onDeleteProduct={(barcode) => console.log('Delete product:', barcode)}
          />
        </TabsContent>

        <TabsContent value="components" className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Numeric Keypad</CardTitle>
              </CardHeader>
              <CardContent>
                <NumericKeypad
                  currentValue={keypadValue}
                  onNumberClick={handleKeypadNumber}
                  onDeleteClick={handleKeypadDelete}
                  onEnterClick={handleKeypadEnter}
                />
              </CardContent>
            </Card>

            {lastReceipt && (
              <Card>
                <CardHeader>
                  <CardTitle>Last Receipt</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReceiptDisplay {...lastReceipt} />
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full"
                >
                  Logout
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReceipt(true)}
                  className="w-full"
                  disabled={!lastReceipt}
                >
                  Show Last Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        totalAmount={checkoutData.total}
        onConfirmPayment={handlePaymentConfirm}
      />

      <WeighingScaleDialog
        isOpen={showWeighing}
        onClose={() => setShowWeighing(false)}
        productName={weighingProduct?.name || ''}
        pricePerKg={weighingProduct?.price || 0}
        onConfirm={handleWeighingConfirm}
      />

      {showReceipt && lastReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Receipt Preview</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReceipt(false)}
              >
                Close
              </Button>
            </div>
            <ReceiptDisplay {...lastReceipt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default POSDemo;
