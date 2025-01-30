interface PayOrderEmailTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderEmailTemplate = (props: PayOrderEmailTemplateProps) => {
  const { orderId, totalAmount, paymentUrl } = props;

  return (
    <div>
      <h1>Заказ #{orderId}</h1>
      <p>К оплате за заказ: <b>{totalAmount} ₽</b></p>
      <p>
        Для оплаты перейдите по <a href={paymentUrl}>данной ссылке</a>.
      </p>
    </div>
  );
};
