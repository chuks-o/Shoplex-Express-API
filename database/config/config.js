require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "nodeapi",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    database: "shoplexdb",
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
  },
};
