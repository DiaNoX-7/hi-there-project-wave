
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onConfirmPayment: (amountPaid: number, change: number) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  onConfirmPayment
}) => {
  const [cashReceived, setCashReceived] = useState('');
  const [change, setChange] = useState(0);

  useEffect(() => {
    const cashAmount = parseFloat(cashReceived) || 0;
    setChange(Math.max(0, cashAmount - totalAmount));
  }, [cashReceived, totalAmount]);

  const handleConfirm = () => {
    const cashAmount = parseFloat(cashReceived) || 0;
    if (cashAmount >= totalAmount) {
      onConfirmPayment(cashAmount, change);
      setCashReceived('');
    }
  };

  const handleCancel = () => {
    setCashReceived('');
    setChange(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Checkout</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          {/* Total Amount */}
          <div className="text-center">
            <Label className="text-lg">Total Amount Due</Label>
            <div className="text-4xl font-bold text-green-600 mt-2">
              ${totalAmount.toFixed(2)}
            </div>
          </div>

          {/* Cash Received Input */}
          <div className="space-y-2">
            <Label htmlFor="cash-received" className="text-lg">
              Cash Received
            </Label>
            <Input
              id="cash-received"
              type="number"
              step="0.01"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder="Enter amount..."
              className="text-xl h-12 text-center"
              autoFocus
            />
          </div>

          {/* Change Display */}
          <div className="text-center">
            <Label className="text-lg">Change</Label>
            <div className={`text-3xl font-bold mt-2 ${
              change >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              ${change.toFixed(2)}
            </div>
            {parseFloat(cashReceived) > 0 && parseFloat(cashReceived) < totalAmount && (
              <p className="text-red-500 text-sm mt-1">
                Insufficient amount
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-12 text-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={parseFloat(cashReceived) < totalAmount}
              className="flex-1 h-12 text-lg"
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
