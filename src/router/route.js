const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')
const bookController=require('../controller/bookController')

router.post('/createUser',userController.createUser)

router.post('/createBook',bookController.createBook)




module.exports=router