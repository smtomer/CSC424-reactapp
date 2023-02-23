const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

function generateAccessToken(username) {
    // return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    return jwt.sign({username:username}, process.env.TOKEN_SECRET, { expiresIn: '2000s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
}

exports.generateAccessToken = generateAccessToken;
exports.authenticateToken = authenticateToken;