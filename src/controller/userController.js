const userModel = require('../model/userModel')


const createUser = async (req, res) => {
    try {

        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: 'enter some data in the body' })

        let { title, name, phone, email, password, address } = data

        if (!title) return res.status(400).send({ status: false, msg: 'enter the title' })

        if (['Mr', 'Mrs', 'Miss'].indexOf(data.title) == -1) return res.status(400).send({ status: false, msg: 'enter only Mr||Mrs||Miss' })

        if (!name) return res.status(400).send({ status: false, msg: 'enter name' })

        if (!phone) return res.status(400).send({ status: false, msg: 'enter phone' })

        let validPhone = await userModel.findOne({ phone: data.phone })

        if (validPhone) return res.status(400).send({ status: false, msg: 'this phone number is alraedy registered' })

        if (!email) return res.status(400).send({ status: false, msg: 'enter emailId' })
        let uniqueEmail = await userModel.findOne({ email: data.email })

        if (uniqueEmail) return res.status(400).send({ status: false, msg: 'this emailId is already registered' })

        if (!password) return res.status(400).send({ status: false, msg: 'enter the password' })

        if (!(password.length >= 8 && password.length <= 15)) return res.status(400).send({ status: false, msg: 'enter password length in b/w 8 to 15 ' })

        if (!address.street) return res.status(400).send({ status: false, msg: 'enter the street' })
        if (!address.city) return res.status(400).send({ status: false, msg: 'enter the city' })
        if (!address.pincode) return res.status(400).send({ status: false, msg: 'enter the pincode' })

        let createData = await userModel.create(data)

        res.status(201).send({ status: true, msg: "user is created successfully", data: createData })


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.msg })
    }

}
module.exports = { createUser }


