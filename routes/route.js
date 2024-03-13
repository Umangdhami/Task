const express = require('express');
const route = express();

const controller = require('../controllers/controllers')

route.get('/', controller.defaultRoute)
route.get('/login', controller.login)
route.get('/register', controller.register)
route.post('/creatUser', controller.creatUser)
route.post('/userLogin', controller.userLogin)
route.post('/createPost', controller.createPost);
route.get('/viewpost', controller.viewpost);
route.get('/updatepost/:id', controller.updatepost);
route.post('/updatePost', controller.updatePost);
route.get('/deletepost/:id', controller.deletepost);

module.exports = route