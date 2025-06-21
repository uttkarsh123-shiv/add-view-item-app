const express = require("express");
const cors = require("cors");
const itemRoutes = require("./Routes/item.route")
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/items', itemRoutes);

module.exports = app;