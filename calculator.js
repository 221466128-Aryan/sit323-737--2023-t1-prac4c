const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const winston = require('winston');
const passport = require("passport");
const jwtStrategy = require("./passport");
const jwt = require("jsonwebtoken");
const jwtSecret = '123';

// This is the Token Verifier. The will verify the token, if the token is incorrect it will return Message: "UnAuthorized"
const verifyToken = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (!user) {
        console.error(info.message);
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };

// set up middleware
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(jwtStrategy);
app.use(verifyToken);


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

const add = (n1, n2) => {
  return n1 + n2;
};

const sub = (n1, n2) => {
    return n1 - n2;
};

const multi = (n1, n2) => {
    return n1 * n2;
};

const div = (n1, n2) => {
    return n1 / n2;
};


//if the token is correct we can acess the information and the data.
app.get("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  try {
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

app.get("/sub", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = sub(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
        } catch(error) { 
            console.error(error)
            res.status(500).json({statuscocde:500, msg: error.toString() })
        }
  });

  app.get("/multi", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = multi(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
        } catch(error) { 
            console.error(error)
            res.status(500).json({statuscocde:500, msg: error.toString() })
        }
  });


  app.get("/div", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = div(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
        } catch(error) { 
            console.error(error)
            res.status(500).json({statuscocde:500, msg: error.toString() })
        }
  });

const port = 3040;
app.listen(port, () => {
  console.log(`Hello!!!. I am listening on port ${port}`);
});