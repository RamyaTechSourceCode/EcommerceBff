import { Product } from "../types";

export default function ProductRow({ product }: { product: Product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.availableStock}</td>
      <td>{product.price}</td>
    </tr>
  );
}