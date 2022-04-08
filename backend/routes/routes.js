const router = require('express').Router()
const bcrypt = require('bcryptjs')
const req = require('express/lib/request')
const { cookie } = require('express/lib/response')
const res = require('express/lib/response')
const jwt = require('jsonwebtoken')
const User = require('../models/User')



//Regsitration
router.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    const result = await user.save()

    //constructor to seperate password from the rest to return
    const { password, ...data } = await result.toJSON()

    res.send(data)

})



//Login
router.post('/login', async (req, res) => {

    const user = await User.findOne({ email: req.body.email })

    //Chcking user
    if (!user) {
        return res.status(404).send({
            message: 'User not found'
        })
    }

    //Checking hashed password
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(408).send({
            message: 'Wrong credentials'
        })
    }

    //Storing id inside JWT token
    const token = jwt.sign({ _id: user._id }, "secret")

    //Storing to a httponly coockie
    res.cookie('jwt', token, {
        httpOnly: true, // To make bakcedn only
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'Success'
    })
})



//Authenticated user
router.get('/user', async (req, res) => {

    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'Unauthenticated'
            })
        }

        const user = await User.findOne({ _id: claims._id })

        const { password, ...data } = await user.toJSON()

        res.send(data)
    } catch (err) {
        return res.status(401).send({
            message: 'Unauthenticated'
        })
    }

})



//Logout
router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })

    res.send({
        message: 'Successfully Logged Out'
    })
})


module.exports = router;