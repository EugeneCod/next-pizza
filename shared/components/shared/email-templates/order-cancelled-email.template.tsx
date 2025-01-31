interface OrderCancelledEmailTemplateProps {
  orderId: number;
}

export const OrderCancelledEmailTemplate = (props: OrderCancelledEmailTemplateProps) => {
  const { orderId } = props;

  return (
    <div>
      <h1>Заказ отменен на стадии оплаты</h1>
      <p>
        Ваш заказ #{orderId} отменен. Вы можете перейти на <a href={process.env.APP_URL}>сайт</a>{' '}
        для формирования нового заказа.
      </p>
    </div>
  );
};
