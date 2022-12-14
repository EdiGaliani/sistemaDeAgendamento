const PORT = 8080;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { create } = require('domain');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/agendamento")

app.get("/", (req, res) => {
    res.send("Olá!");
})

app.get("/cadastro", (req, res) => {
    res.render("create");
})

app.listen(PORT, () => {console.log("Server Running on Port", PORT)});