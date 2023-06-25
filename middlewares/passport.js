const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/User")
const bcrypt = require("bcrypt");
const errorHandler = require("./errorHandler");
const { Error } = require("mongoose");
const JWTStrategy = require("passport-jwt").Strategy;
const {fromAuthHeaderAsBearerToken} = require("passport-jwt").ExtractJwt
require("dotenv").config()
exports.localUserStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);



exports.jwtStrategy = new JWTStrategy({
  jwtFromRequest: fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, 
async(requestToken, done) =>{
  if(Date.now() > requestToken.exp * 1000){
    return done(null, false)

  }
  try {
    const user = await User.findById(tokenPayload._id)
    return done(null,user)
    
  } catch (error) {
    return done(error)
  }
  

}
);