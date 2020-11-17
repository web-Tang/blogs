const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const verifyToken = require("./verifyToken");
const cors = require("cors");

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, "*");
        return;
      }
      callback(null, origin);
    },
    credentials: true,
    exposedHeaders: ["authorization"],
  })
);

app.use("/", express.static(path.resolve(__dirname, "../dist")));

app.use(express.json());

app.use(cookieParser());

app.use(verifyToken);

app.use("/upload", require("./api/uploadApi"));
app.use("/user", require("./api/userApi"));
app.use("/type", require("./api/typeApi"));
app.use("/articles", require("./api/articlesApi"));
app.use("/witticism", require("./api/witticismApi"));

app.use(require('./error'))

const prot = 5008;
app.listen(prot, () => {
  console.log(`${prot}端口监听`);
});
