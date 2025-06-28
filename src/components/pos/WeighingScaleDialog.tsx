
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface WeighingScaleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  pricePerKg: number;
  onConfirm: (weight: number, totalPrice: number) => void;
}

const WeighingScaleDialog: React.FC<WeighingScaleDialogProps> = ({
  isOpen,
  onClose,
  productName,
  pricePerKg,
  onConfirm
}) => {
  const [currentWeight, setCurrentWeight] = useState(0);

  const readWeight = () => {
    // Mock weight reading - in real app this would interface with actual scale
    const mockWeight = Math.round((Math.random() * 2 + 0.1) * 100) / 100; // 0.1 to 2.1 kg
    setCurrentWeight(mockWeight);
  };

  const handleConfirm = () => {
    if (currentWeight > 0) {
      const totalPrice = currentWeight * pricePerKg;
      onConfirm(currentWeight, totalPrice);
      setCurrentWeight(0);
      onClose();
    }
  };

  const handleCancel = () => {
    setCurrentWeight(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Weighing Scale</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          {/* Product Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold">{productName}</h3>
            <p className="text-gray-600">${pricePerKg.toFixed(2)} per kg</p>
          </div>

          {/* Weight Display */}
          <div className="text-center bg-gray-50 p-6 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Current Weight</div>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {currentWeight.toFixed(2)}
            </div>
            <div className="text-lg text-gray-700">kg</div>
          </div>

          {/* Total Price */}
          {currentWeight > 0 && (
            <div className="text-center">
              <div className="text-sm text-gray-600">Total Price</div>
              <div className="text-2xl font-bold text-green-600">
                ${(currentWeight * pricePerKg).toFixed(2)}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={readWeight}
              className="w-full h-12 text-lg"
              variant="outline"
            >
              Read Weight
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={currentWeight <= 0}
                className="flex-1 h-12"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeighingScaleDialog;
