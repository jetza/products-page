import { QuantitySelector } from "./QuantitySelector";
import { Button } from "./Buttons/Button";

interface AddToCartSectionProps {
  quantity: number;
  onQuantityDecrease: () => void;
  onQuantityIncrease: () => void;
  onAddToCart: () => void;
  disabled?: boolean;
}

export function AddToCartSection({
  quantity,
  onQuantityDecrease,
  onQuantityIncrease,
  onAddToCart,
  disabled = false,
}: AddToCartSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <QuantitySelector
          quantity={quantity}
          onDecrease={onQuantityDecrease}
          onIncrease={onQuantityIncrease}
          disabled={disabled}
        />
        <Button
          variant="primary"
          size="lg"
          onClick={onAddToCart}
          disabled={disabled}
          className="flex-1 h-12"
        >
          Add to cart
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        Estimate delivery 2-3 days
      </p>
    </div>
  );
}
