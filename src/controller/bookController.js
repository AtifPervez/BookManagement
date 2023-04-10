const bookModel = require('../model/bookModel')
const userModel = require('../model/userModel')
const checkISBN = require('node-isbn')
const moment = require('moment')
const { default: mongoose } = require('mongoose')
const reviewModel = require('../model/reviewModel')

const createBook = async (req, res) => {

    try {
        let data = req.body

        if (Object.keys(data) == 0) res.status(400).send({ status: false, msg: 'enter some data in the body' })

        let { title, excerpt, userId, ISBN, category, subcategory } = data

        if (!title) res.status(400).send({ status: false, msg: 'enter the title' })

        if (!excerpt) res.status(400).send({ status: false, msg: 'enter the excerpt' })

        if (!userId) res.status(400).send({ status: false, msg: 'enter the userId' })
        if (!ISBN) return res.status(400).send({ status: false, msg: 'enter ISBN number' })

        let checkISBN = await bookModel.findOne({ ISBN: data.ISBN })

        if (checkISBN) return res.status(400).send({ status: false, msg: 'this ISBN number is not for this book,its already in used' })

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

const getBook = async (req, res) => {

    try {
        let data = req.query


        if (data.userId) {

            if (!mongoose.isValidObjectId(data.userId)) {
                return res.status(400).send({ status: false, msg: 'plz enter valid _id' })
            }

            let checkbookId = await userModel.findOne({ _id: data.userId })

            if (!checkbookId) return res.status(404).send({ status: false, msg: 'this user is not exist in the database' })
        }

        let getBook = await bookModel.find({
            $or: [
                { _id: data._id },
                { userId: data.userId },
                { category: data.category },
                { subcategory: data.subcategory }
            ], isDeleted: false
        }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })

        if (getBook.length == 0) return res.status(400).send({ status: false, msg: 'this book is deleted' })

        return res.status(200).send({ status: true, msg: 'Book List', data: getBook })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.msg })
    }
}


const getBookByParams = async (req, res) => {


    try {
        let bookId = req.params.bookId

        if (!mongoose.isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: 'Invalid book_id' })

        let checkBook = await bookModel.findOne({ _id: bookId })

        if (!checkBook) return res.status(400).send({ status: false, msg: 'no such book present in the record' })

        let getBook = await bookModel.find({ _id: bookId, isDeleted: false }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })

        if (getBook.length == 0) return res.status(400).send({ status: false, msg: 'This Book is deleted' })

        let review = await reviewModel.find({
            bookId: bookId, isDeleted: false
        })

        getBook.reviewData = [...review]

        res.status(200).send({ status: true, msg: "Book ListBy_id", data: getBook })




    } catch (error) {
        return res.status(500).send({ status: false, msg: error.msg })

    }



}



























module.exports = { createBook, getBook, getBookByParams }