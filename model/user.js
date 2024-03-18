const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {type: String, required : true},
    email: {type: String, required : true, unique: true},
    password: {type: String, required : true},
    quote: {type: String},
},
//made schema and defined the collection
    {collections : "user"}
);

const User = new mongoose.model('User', userSchema)

module.exports = User