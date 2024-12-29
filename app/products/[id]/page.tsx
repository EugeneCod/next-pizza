import { NextPage } from 'next';

export default function ProductPage({ params: { id } }: PageWithParams) {
  return <div>Product {id}</div>;
}
