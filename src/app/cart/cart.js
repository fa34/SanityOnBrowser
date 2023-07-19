const { Model } = require('drizzle-orm');

class Cart extends Model {
  static schema = {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    product_id: {
      type: 'integer',
      foreignKey: {
        model: 'Product',
        key: 'id',
      },
    },
    quantity: {
      type: 'integer',
      default: 0,
    },
  };
}

module.exports = Cart;
