const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    note : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Contact', contactSchema)