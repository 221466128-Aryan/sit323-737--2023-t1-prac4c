const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const jwtSecret = '123';
const jwt = require("jsonwebtoken");

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JWTStrategy(jwtOptions, (jwtPayload, done) => {
  // This will check if my Payload in the token is correct.
  if(jwtPayload && jwtPayload.username === "admin") {
    return done(null, true);
  } else {
    return done(null, false);
  }
});

//Defining variable payload.
const payload = {
  //payload data which has username: admin
  username: 'admin'
};


//this will create a token based on the payload data. Depending on the Payload data this will be different token each time.
const token = jwt.sign(payload, jwtSecret);

//This will print out the token in the console for us to copy to use it as access for the header.
console.log("The Token is the Following: ", token);


module.exports = jwtStrategy;