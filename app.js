require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const mongosse = require('mongoose')
const bcrypt = require('bcrypt')

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a API"})
})

app.listen(3000)
