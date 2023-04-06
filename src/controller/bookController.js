const bookModel = require('../model/bookModel')
const userModel = require('../model/userModel')
const checkISBN = require('node-isbn')
const moment=require('moment')

const createBook = async (req, res) => {

    try {
        let data = req.body

        if (Object.keys(data) == 0) res.status(400).send({ status: false, msg: 'enter some data in the body' })



        let { title, excerpt, userId,category, subcategory,releasedAt } = data

        if (!title) res.status(400).send({ status: false, msg: 'enter the title' })

        if (!excerpt) res.status(400).send({ status: false, msg: 'enter the excerpt' })

        if (!userId) res.status(400).send({ status: false, msg: 'enter the userId' })

        let checkUserId = await userModel.findOne({ _id: userId })

        if (!checkUserId) res.status(400).send({ status: false, msg: 'no such userId exist' })

        if (!category) res.status(400).send({ status: false, msg: 'enter category' })

        if (!subcategory) res.status(400).send({ status: false, msg: 'enter subcategory' })

        let createdBook = await bookModel.create(data)

        return res.status(201).send({ status: true, msg: 'Book is successfully created', bookData: createdBook })

    } catch (error) {
       return res.status(500).send({ status: false, msg: error.msg })
    }

}
module.exports = { createBook }