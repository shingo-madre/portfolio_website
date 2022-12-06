const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    profession: {
        required: true,
        type: String,
    }, 
    message: {
        required: true,
        type: String,
    }, 
    fileName: {
        data: Buffer,
        type: String
    }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);