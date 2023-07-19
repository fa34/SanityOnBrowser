import db from '../db';

export default function CartPage({ cartItems }) {
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((cartItem) => (
        <div key={cartItem.id}>
          <p>User ID: {cartItem.user_id}</p>
          <p>Product ID: {cartItem.product_id}</p>
          <p>Quantity: {cartItem.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch cart items from the 'cart' table
    const query = 'SELECT * FROM cart';
    const { rows: cartItems } = await db.query(query);

    return { props: { cartItems } };
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    return { props: { cartItems: [] } };
  }
}
