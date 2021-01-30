const mongoose = require('mongoose');

// const validator = require('validator');

const lik = new mongoose.Schema( {    

    cookieID: {
        type: String,
    },
    like: {
        type: String,
    }
})

const like = mongoose.model('like', lik);

module.exports = like;
