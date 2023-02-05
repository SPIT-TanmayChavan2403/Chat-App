const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type :String,
        required: true,
        unique: true
    },
    about:{
        type:String,
        required: false,
    },
    profileUrl:{
        type:String,
        required: false,
    },
    users:{
        type:Object,
        required: false
    },
    socketId:{
        type: String,
        trim: true
    }
})

schema.statics.login = async function(username, password){
    const user = await this.findOne({username: username});
    if (user){
        if (password === user.password){
            return user;
        } else {
            throw Error('Incorrect password');
        }
    } else {
        throw Error('User does not exits');
    }
}

const userSchema = mongoose.model('user', schema);
module.exports = userSchema;