require('dotenv').config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const { UserModel, AdminModel } = require("./config/db");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 5,
});

app.use(limiter);
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    await mongoose.connect(process.env.URI);    
    app.listen(process.env.PORT);
}

main();