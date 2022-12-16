const appointment = require("../models/Appointment");
const mongoose = require("mongoose");
const AppointmentsFactory = require("../factories/AppointmentsFactory");

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
            let appos = await Appo.find({'finished': false});
            let appointments = [];

            appos.forEach(appointment => {
                if(appointment.date != undefined){
                    appointments.push(AppointmentsFactory.Build(appointment))
                }
            });
            return appointments;
        }
    }
    async GetById(id) {
        try {
            let event = await Appo.findOne({'_id': id});
            return event;
        } catch (error) {
            console.log(error);
        }
    }
    async Finish(id) {
        try {
            await Appo.findByIdAndUpdate(id, {finished: true});
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new AppointmentService();