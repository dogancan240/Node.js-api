const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
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
    surname: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      nullable: false,
      unique: true,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    tel: {
      type: "varchar",
      nullable: false,
    },
  },
  relations: {
    orders: {
      type: "one-to-many",
      target: "Order",
      inverseSide: "user",
    },
  },
});
