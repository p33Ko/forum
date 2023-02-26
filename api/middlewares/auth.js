const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.body.userId = decoded.userId;

      next();
    } else {
      console.log(err, "auth failed");
      return res.status(401).json({ tasks: "auth failed" });
    }
  });
};
