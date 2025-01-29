import { cn } from '@/shared/lib/utils';
import { CheckoutCartItem, CheckoutCartItemSkeleton, WhiteBlock } from '..';
import { getCartItemDetails } from '@/shared/lib';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface CheckoutCartProps extends PropsWithClassName {
  cartItems: CartStateItem[];
  loading?: boolean;
  onChangeCartItemQuantity: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  onRemoveCartItem: (id: number) => void;
}

export const CheckoutCart = (props: CheckoutCartProps) => {
  const { className, cartItems, loading, onChangeCartItemQuantity, onRemoveCartItem } = props;
  return (
    <WhiteBlock
      className={cn(className)}
      title="1. Корзина"
      contentClassName="flex flex-col gap-y-5">
      {loading && !cartItems.length
        ? [...Array(4)].map((_, index) => <CheckoutCartItemSkeleton key={index} />)
        : cartItems.map((item) => (
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
              updating={item.updating}
            />
          ))}

      {}
    </WhiteBlock>
  );
};
