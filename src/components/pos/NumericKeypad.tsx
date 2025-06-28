
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NumericKeypadProps {
  onNumberClick: (number: string) => void;
  onDeleteClick: () => void;
  onEnterClick: () => void;
  currentValue?: string;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onNumberClick,
  onDeleteClick,
  onEnterClick,
  currentValue = ''
}) => {
  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫']
  ];

  const handleButtonClick = (value: string) => {
    if (value === '⌫') {
      onDeleteClick();
    } else if (value === '.') {
      if (!currentValue.includes('.')) {
        onNumberClick(value);
      }
    } else {
      onNumberClick(value);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        {/* Display */}
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <div className="text-right text-2xl font-mono min-h-[2rem]">
            {currentValue || '0'}
          </div>
        </div>

        {/* Number Grid */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {numbers.flat().map((num, index) => (
            <Button
              key={index}
              variant={num === '⌫' ? 'destructive' : 'outline'}
              size="lg"
              className="h-16 text-xl font-semibold"
              onClick={() => handleButtonClick(num)}
            >
              {num}
            </Button>
          ))}
        </div>

        {/* Enter Button */}
        <Button
          onClick={onEnterClick}
          className="w-full h-16 text-xl font-semibold"
          disabled={!currentValue || currentValue === '0'}
        >
          Enter
        </Button>
      </CardContent>
    </Card>
  );
};

export default NumericKeypad;
