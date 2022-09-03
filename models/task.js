const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    content: {
        type: String, 
    },  
    date: {
        type: Date, 
        default: Date.now, 
        required: true
    }
})


module.exports = mongoose.model("task", taskSchema);