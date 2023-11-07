const express = require("express");
const app = express();
require("./db/conn");
const routes = require("./router/routes");
const port = process.env.port || 3434;
const ejs = require("ejs");

app.get("/", (req,res) => {
    res.send("Homepage");
});

app.set("view engine", "ejs");

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is running on ${port} port number`);
});