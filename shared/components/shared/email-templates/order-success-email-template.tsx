import type { CartItemDTO } from '@/shared/services/dto/cart.dto';

interface OrderSuccessEmailTemplateProps {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessEmailTemplate = (props: OrderSuccessEmailTemplateProps) => {
  const { orderId, items } = props;

  return (
    <div>
      <h1>Спасибо за покупку! 🎉</h1>
      <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

      <hr />

      <ul>
        {items.map((item) => {
          const name = item.productItem.product.name;
          const quantity = item.quantity;
          const price = item.productItem.price;
          const totalPrice = quantity * price;
          return (
            <li key={item.id}>
              {name} | {price} ₽ x {quantity} шт. = {totalPrice} ₽
            </li>
          );
        })}
      </ul>
    </div>
  );
};
