const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Order",
  tableName: "orders",
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
    startDate: {
      type: "datetime",
      nullable: false,
    },
    endDate: {
      type: "datetime",
      nullable: false,
    },
    isinSale: {
      type: "boolean",
      nullable: false,
    },
    isActive: {
      type: "boolean",
      nullable: false,
    },
    saleValue: {
      type: "float",
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
    },
    package: {
      type: "many-to-one",
      target: "Package",
      joinColumn: true,
    },
  },
});
