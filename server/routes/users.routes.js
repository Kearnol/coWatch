const UserController = require('../controllers/users.controller');
const jwt = require("jsonwebtoken");
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/register', UserController.register);
    app.get('/api/users', authenticate, UserController.getAll);
    app.post('/api/users', authenticate, UserController.updateUser);
    app.post('/api/find/user', authenticate, UserController.getOneUser)
    app.post('/api/login', UserController.login);
    app.get('/api/logout', UserController.logout);
    app.get('/auth', authenticate, UserController.success);
}