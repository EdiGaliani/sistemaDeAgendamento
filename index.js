const PORT = 8080;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appointmentService = require("./services/AppointmentService");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/agendamento")

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/cadastro", (req, res) => {
    res.render("create");
})

app.post("/create", async (req, res) => {
    console.log(req.body);
    var status = await appointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    )
    
    if(status){
        res.redirect("/");
    }else{
        res.send("Ocorreu um erro");
    }
});

app.listen(PORT, () => {console.log("Server Running on Port", PORT)});