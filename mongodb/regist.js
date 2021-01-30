const mongoose = require('mongoose');
// const validator = require('validator');



const regScema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique:true
        // required: true,
        // lowercase: true,
        // validate(value) {
        //     // console.log(value)
        //     if (!validator.isEmail(value)) {
        //         throw new Error('You have entered wrong email address.')
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        // validate(value) {
        //     // console.log(value);
        //     if (value.toLowerCase().includes("password")) {
        //         throw new Error('Type except password, which is more than six character');
        //     }

        // }
    },
    uui:{
        type:String
    }
})

const regist = mongoose.model('reg_schema_new', regScema);

module.exports = regist;

