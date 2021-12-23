const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { User } = require('./models/User');

function initialize(passport){
    const authenticateUser = (email, password, done) =>{
        User.findOne({email: email}, (err, user) => {
            if (err) {return done(err)}
            if (!user){
                return done(null, false, {message: "No user with that email"})
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {return done(err)}
                if (result === true){
                    return done(null, user)
                } else{
                    return done(null, false, {message:"Incorrect Password"})
                }
            })
            
        })
    }
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)}
            )
        })
}

module.exports = initialize