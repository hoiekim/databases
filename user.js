const express = require('express')
const app = express()

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

let confirmed
let userData

const check = (username, password) => {
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function(err, user) {
            if (err) return done(err)
            if (!user) return done(null, false, { message: 'Incorrect username.' })
            if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' })
            return done(null, user)
          })
        }
    ))
    app.post('/login', () => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                confirmed = false
                return
            }
            confirmed = true
            userData = user
        })
    })
}

const createUser = (username, password) => {
    /* create user */
}

const getUser = (username, password) => {
    check(username, password)
    return userData
}

const deleteUser = (username, password) => {
    check(username, password)
    if (confirmed) {/* delete user */}
}

const isConfirmed = (username, password) => {
    check(username, password)
    return confirmed
}

const hasDBPassword