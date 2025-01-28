import { cn } from '@/shared/lib/utils';
import { CheckoutCartItem, WhiteBlock } from '..';
import { getCartItemDetails } from '@/shared/lib';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface CheckoutCartProps extends PropsWithClassName {
  cartItems: CartStateItem[];
  onChangeCartItemQuantity: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  onRemoveCartItem: (id: number) => void;
}

export const CheckoutCart = (props: CheckoutCartProps) => {
  const { className, cartItems, onChangeCartItemQuantity, onRemoveCartItem } = props;
  return (
    <WhiteBlock
      className={cn(className)}
      title="1. Корзина"
      contentClassName="flex flex-col gap-y-5">
      {cartItems.map((item) => (
        <CheckoutCartItem
          key={item.id}
          onClickCountButton={onChangeCartItemQuantity}
          onClickRemove={onRemoveCartItem}
          id={item.id}
          imageUrl={item.imageUrl}
          details={getCartItemDetails(item.pizzaType, item.pizzaSize, item.ingredients)}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          disabled={item.disabled}
        />
      ))}
    </WhiteBlock>
  );
};
