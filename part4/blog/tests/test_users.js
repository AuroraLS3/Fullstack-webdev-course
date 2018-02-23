const User = require('../models/user')

const initial = {
    username: "root",
    name: "Super",
    adult: true,
    password: "super"
}

const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    adult: true,
    password: "salainen"
}

const newUser_badPass = {
    username: "test",
    name: "Testaaja",
    adult: false,
    password: "s"
}

const newUser_noAdult = {
    username: "joku",
    name: "Emn",
    password: "password"
}

const newUser_falseAdult = {
    username: "joku2",
    name: "Emn",
    adult: false,
    password: "password"
}

module.exports = {
    initial,
    newUser,
    newUser_badPass,
    newUser_noAdult,
    newUser_falseAdult
}