module.exports = {
  type: "mysql",
  host: process.env.DB_HOST || "sql7.freesqldatabase.com",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || "sql7707551",
  password: process.env.DB_PASSWORD || "iSnIEXWCr6",
  database: process.env.DB_DATABASE || "sql7707551",
  synchronize: false, // if there is no table make it true and run once, then make it false
  logging: false,
  entities: ["dist/models/**/*.js"],
};
