const appointment = require("../models/Appointment");
const mongoose = require("mongoose");

const Appo = mongoose.model("appointment", appointment);

class AppointmentService {
    async Create(name, email, description, cpf, date, time) {
        let newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false
        });
        try {
            await newAppo.save();
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }
    async GetAll(showFinished) {
        if(showFinished){
            return await Appo.find();
        }else{
            return await Appo.find({'finished': false});
        }
    }
}

module.exports = new AppointmentService();