
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">SuperMart POS</CardTitle>
          <CardDescription className="text-lg">
            Complete Point of Sale System
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            A fully featured POS system with barcode scanning, checkout, weighing scale integration, and receipt printing.
          </p>
          
          <Button
            onClick={() => navigate('/pos')}
            className="w-full h-12 text-lg"
            size="lg"
          >
            Launch POS System
          </Button>
          
          <div className="text-sm text-gray-500 text-center mt-4">
            <p>Demo Features:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Barcode scanning & manual entry</li>
              <li>Shopping cart management</li>
              <li>Checkout with cash handling</li>
              <li>Weighing scale for bulk items</li>
              <li>Receipt generation & preview</li>
              <li>Product management</li>
              <li>Numeric keypad for manual input</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
