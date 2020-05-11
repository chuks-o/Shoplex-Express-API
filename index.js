const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { handleError } = require("./utilities/errorHandler.js");
const port = 5000;
global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
//allow OPTIONS on all resources
app.options("*", cors());

// routes
app.use("/auth", require("./routes/auth.js"));
app.use("/user", require("./routes/user.js"));
app.use("/products", require("./routes/product.js"));
app.use("/regions", require("./routes/region.js"));
app.use("/products/sub", require("./routes/subcategories.js"));
app.use("/products/main", require("./routes/maincategories.js"));
app.use("/wishlist", require("./routes/wishlist.js"));
app.use("/packages", require("./routes/packages.js"));
app.use("/subscriptions", require("./routes/subscription.js"));
app.use("/emails", require("./routes/emails.js"));

// Error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => console.log(`App running on port ${port}.`));
