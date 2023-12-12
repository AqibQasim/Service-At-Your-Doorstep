const mongoose = require("mongoose")

const userData = new mongoose.Schema({
    Name:{
        type: String
    },
    Email:{
        type: String
    },
    Mobile:{
        type: Number
    },
    Date:{
        type: String
    },
    Address:{
        type: String
    },
    Message:{
        type: String
    }
})

const User = mongoose.model("User", userData)
module.exports = User
