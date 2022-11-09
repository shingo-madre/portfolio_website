const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String,
        enum: [
            "raka",
            "arshad"
        ]
    },
    image: {
        data: Buffer,
        type: String
    },
    year: {
        required: true,
        type: Date
    },
    role: {
        required: true,
        type: String
    },
    link: {
        required: true,
        type: String,
        default: "None"
    }
})

module.exports = mongoose.model('Portfolio', portfolioSchema)