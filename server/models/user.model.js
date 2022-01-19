const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
    }},
    password: {type: String, required: true},
    prof_img: {type: String},
    fav_team: {type: String},
    sec_team: {type: String},
    location: {type: String},
    friends: {type: Array},
    wins: {type: Number},
    losses: {type: Number},
    draws: {type: Number},
    clout: {type: Number},
    rank: {type: Number},
    status_level: {type: String}
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
})

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
