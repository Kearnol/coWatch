const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

module.exports.index = (req, res) => {
    res.json({
        message: "Hello World"
    });
}

module.exports.createUser = (req, res) => {
    User.create(req.body)
    .then(newUser => res.json(newUser))
    .catch(err => res.json(err));
}

module.exports.register = (req, res) => {
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        res.cookie("usertoken", userToken, {
            httpOnly: true, sameSite: "Lax"}).json({msg: "success", user:user });
    })
    .catch(err => res.json(err));
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    console.log(user)
    if (user === null) {
        return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword){
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    console.log("cookie", req.cookies)
    res.cookie("usertoken", userToken, {
        httpOnly: true,
        sameSite: "Lax"
    }).json({msg: "success!", user: user});
}

module.exports.logout = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
}

module.exports.getAll = (req, res) => {
    User.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
}
module.exports.getOneUser = (req, res) => {
    User.findOne({_id: req.body.id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
}

module.exports.success = (req, res) => {
    res.json({msg: "successful login."})
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.body._id}, req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
}
