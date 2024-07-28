module.exports = {
  type: "mysql",
  host: process.env.DB_HOST || ,
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  synchronize: false, // if there is no table make it true and run once, then make it false
  logging: false,
  entities: ["dist/models/**/*.js"],
};
