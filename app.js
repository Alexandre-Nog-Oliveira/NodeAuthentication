require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const mongosse = require('mongoose')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())

const User = require('./models/User')

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a API"})
})


app.post('/user/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    if(!name || !email || !password ){

        return res.status(422).json({message: "Missing field, check if you left any fields blank"})

    } else if(password !== confirmpassword){

        return res.status(422).json({message: "Passwords don't match"})
        
    }

    const userExists = await User.findOne({ email:email })

    if(userExists){
        res.status(422).json({message: "Email already registered, use another email"})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password,
    })

    try {
        await user.save()
        return res.status(200).json({message: "Registered user"})
    }catch(error){
        res.status(500).json({message: error})
    }

    

})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongosse.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.zuv6swt.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`).then(() => {
    app.listen(3000)
    console.log('Connect database')
}).catch((err) => console.log(err))