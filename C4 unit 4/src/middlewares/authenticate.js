require("dotenv").config();
const jwt = require("jsonwebtoken");


const verifyToken =(token) => {
  return jwt.verify(token,process.env.JWT_ACCESS_KEY);
}
module.exports = async (req, res, next) => {
  // if we received the bearer token in the header
  const bearerToken = req?.headers?.authorization;

  // if not received or token is not a bearer token then we will throw an error
  if (!bearerToken || !bearerToken.startsWith("Bearer "))
    return res.status(400).json({
      status: "failed",
      message: " Please provide a valid token",
    });

  // else we will try to get the user from the token
  const token = bearerToken.split(" ")[1];

  // let user;
 
    const user = await verifyToken(token);
 
  // if no user found then we will throw an error
  if (!user)
    return res.status(400).json({
      status: "failed",
      message: " Please provide a valid token",
    });

  // else we will attach the user to the req
  req.user = user;

  // return next
  return next();
};