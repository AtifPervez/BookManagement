const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')
const bookController=require('../controller/bookController')

router.post('/createUser',userController.createUser)

router.post('/createBook',bookController.createBook)

router.get('/getBook',bookController.getBook)

router.get('/getBookByParams/:bookId',bookController.getBookByParams)




module.exports=router