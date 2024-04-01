const express = require('express');
const route = express();

const controller = require('../controllers/controllers')

route.get('/', controller.defaultRoute)
route.get('/login', controller.login)
route.get('/register', controller.register)
route.post('/createUser', controller.createUser)
route.post('/userLogin', controller.userLogin)
route.get('/logOut', controller.logOut)
route.post('/addCategory', controller.addCategory)
route.get('/addCategory_page', controller.addCategory_page)

route.get('/categoryList', controller.categoryList)
route.get('/editCategory/:id', controller.editCategory)
route.post('/updateCategory', controller.updateCategory)
route.get('/deleteCategory/:id', controller.deleteCategory)


route.get('/pruduct_form', controller.pruduct_form)
route.post('/addProduct', controller.addProduct)
route.get ('/viewProduct', controller.viewProduct)
route.get('/editProduct/:id', controller.editProduct)
route.post('/updateProduct', controller.updateProduct)
route.get('/deleteProduct/:id', controller.deleteProduct)
route.get('/allProducts', controller.allProducts)

route.get('/navbar', controller.navbar)

module.exports = route