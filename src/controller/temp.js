const getBook = async function (req, res) {

    try {
        let query = req.query
        let { userId, subcategory, category } = query

        let obj = {}

        if (isValid(userId)) {
            if (!mongoose.isValidObjectId(userId)) {
                return res.status(400).send({ status: false, message: "plz enter Valid userID" })

            }
            obj.userId = userId
        }

        if (isValid(category)) {
            obj.category = category
        }

        //it's checking subcategory as a string

        if (isValid(subcategory)) {
            let a = subcategory.trim().split(",").map(x => x.trim())
            obj.subcategory = { $all: a }
        }

        const books = await bookModel.find({ ...obj, isDeleted: false }).select({ createdAt: 0, updatedAt: 0, __v: 0, subcategory: 0, isDeleated: 0,ISBN:0}).sort({title:1})
        if (!books.length) {
            return res.status(404).send({ status: false, message: "there is no book found" })

        }
        return res.status(200).send({ status: true,message: 'Books list', data: books })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}