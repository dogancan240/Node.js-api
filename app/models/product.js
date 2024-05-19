const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Product",
  tableName: "products",
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
    packages: {
      type: "many-to-many",
      target: "Package",
      inverseSide: "products",
      joinTable: {
        name: "package_products",
      },
    },
  },
});
