//model file for employee record
const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    _id: Number,
    employeeName: String,
    title: String,
    location: String
});


module.exports = mongoose.model('Employee', employeeSchema);