require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const mongosse = require('mongoose')
const bcrypt = require('bcrypt')

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a API"})
})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongosse.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.zuv6swt.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`).then(() => {
    app.listen(3000)
    console.log('Connect database')
}).catch((err) => console.log(err))

