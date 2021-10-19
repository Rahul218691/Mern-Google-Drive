const jwt = require('jsonwebtoken');


const generateAccountToken = (id) =>{
  return jwt.sign({ id },process.env.JWT_VERIFICATION_CODE, {
    expiresIn: '30d',
  })
}


const verifyAccountToken = (code) =>{
  return jwt.verify(code,process.env.JWT_VERIFICATION_CODE);
}


const createAccesToken = (payload) =>{
  return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}

const createRefreshToken = (payload) =>{
  return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'})
}


const verifyRefreshToken = (payload) =>{
  return jwt.verify(payload,process.env.REFRESH_TOKEN_SECRET);
}


module.exports = {
	generateAccountToken,
  verifyAccountToken,
  createAccesToken,
  createRefreshToken,
  verifyRefreshToken
}