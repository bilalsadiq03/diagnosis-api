const mongoose = require("mongoose")

const diagnosisSchema = new mongoose.Schema({
    symptoms: String,
    results: Array,
    craetedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Diagnosis", diagnosisSchema);