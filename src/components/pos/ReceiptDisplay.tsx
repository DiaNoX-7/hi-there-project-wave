
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface ReceiptDisplayProps {
  storeName?: string;
  transactionDate: Date;
  items: ReceiptItem[];
  totalAmount: number;
  amountPaid: number;
  change: number;
  receiptNumber?: string;
}

const ReceiptDisplay: React.FC<ReceiptDisplayProps> = ({
  storeName = "SuperMart",
  transactionDate,
  items,
  totalAmount,
  amountPaid,
  change,
  receiptNumber = `TXN${Date.now().toString().slice(-6)}`
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white">
      <CardContent className="p-4 font-mono text-sm">
        {/* Store Header */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold">{storeName}</h2>
          <p className="text-xs">123 Main Street</p>
          <p className="text-xs">City, State 12345</p>
          <p className="text-xs">Tel: (555) 123-4567</p>
        </div>

        {/* Transaction Info */}
        <div className="border-t border-b border-dashed py-2 mb-4 text-xs">
          <div className="flex justify-between">
            <span>Receipt #:</span>
            <span>{receiptNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{transactionDate.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{transactionDate.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Items */}
        <div className="mb-4">
          {items.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <span className="truncate pr-2">{item.name}</span>
                <span>${item.total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-600 ml-2">
                {item.quantity} x ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-dashed pt-2 space-y-1">
          <div className="flex justify-between font-bold">
            <span>TOTAL:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Cash Paid:</span>
            <span>${amountPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Change:</span>
            <span>${change.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-xs">
          <p className="mb-1">Thank you for shopping with us!</p>
          <p>Please keep your receipt</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiptDisplay;
