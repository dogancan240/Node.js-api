require("reflect-metadata");
const cors = require("cors");
const { createConnection } = require("typeorm");
const express = require("express");
const ormconfig = require("./app/config/ormconfig");
const User = require("./app/models/user");
const Order = require("./app/models/order");
const Package = require("./app/models/package");
const Product = require("./app/models/product");

const userRoutes = require("./app/routes/userRoutes");
const orderRoutes = require("./app/routes/orderRoutes");
const packageRoutes = require("./app/routes/packageRoutes");
const productRoutes = require("./app/routes/productRoutes");

const app = express();
app.use(express.json());

app.use(cors());

createConnection({
  ...ormconfig,
  entities: [User, Order, Package, Product],
})
  .then(() => {
    console.log("Database connected");

    app.use("/api/users", userRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/packages", packageRoutes);
    app.use("/api/products", productRoutes);

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));
