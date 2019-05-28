require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.route");
const indexRoutes = require("./routes/index.route");
const mongoose = require("mongoose").set("debug", true);

/* Initial CORS before boyParser*/
app.options("*", cors());
app.use(
  cors({
    credentials: true
  })
);
// for parsing application/json
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
/* Connect to Mongo DB*/
mongoose
  .connect(process.env.MONGO_URI || process.env.MONGO_LOCAL, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

/* Serve static file if in production*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build/index.html"));
  });
}
app.use("/api", userRoutes);
app.use("/api", indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("api runnging on port " + PORT + ": "));
