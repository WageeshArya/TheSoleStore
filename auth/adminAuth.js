const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    req.adminData = decoded;
    next();
  }
  catch(err) {
    console.log(err);
    return res.status(401).json({
      error: err
    })
  }
}