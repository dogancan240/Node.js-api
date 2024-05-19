const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Package",
  tableName: "packages",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    category: {
      type: "varchar",
      nullable: false,
    },
    price: {
      type: "float",
      nullable: false,
    },
  },
  relations: {
    products: {
      type: "many-to-many",
      target: "Product",
      joinTable: {
        name: "package_products",
      },
    },
    orders: {
      type: "one-to-many",
      target: "Order",
      inverseSide: "package",
    },
  },
});
