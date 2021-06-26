const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const secret = process.env.jwtSecret;
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.user?.id;
      //   console.log(req.userId);
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
