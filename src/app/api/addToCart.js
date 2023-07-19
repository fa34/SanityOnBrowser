import { v4 as uuidv4 } from 'uuid';
import db from '../../db';
import Cart from '../../models/Cart';

export default async function handler(req, res) {
  const { product_id, quantity } = req.body;

  // Validate the input data and check if the product exists
  // ...

  try {
    // Generate a unique user ID
    const userId = uuidv4();

    // Insert the cart item into the 'cart' table with the generated user ID
    const cartItem = await Cart.create({ user_id: userId, product_id, quantity });

    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add to cart.' });
  }
}
