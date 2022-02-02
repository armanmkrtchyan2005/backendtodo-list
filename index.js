const express = require("express");
const mongoose = require("mongoose");
const content = require("./router/contentRouter");
const todo = require("./router/todo");

const PORT = process.env.PORT || 80;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(content);
app.use(todo);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://arman:13575378@cluster0.ujnt9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => {
      console.log(`Started on PORT ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
