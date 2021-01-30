const mongoose = require('mongoose');

// const validator = require('validator');

const log = new mongoose.Schema( {    

    cookieID: {
        type: String,
    },
    path: {
        type: String,
    },
    time:{
        type:String
    }
})

const login = mongoose.model('Admin_see_data', log);

module.exports = login;
