const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/userModel");

module.exports.REGISTER = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const capitalize = () => {
    const userName = req.body.name;
    return userName.charAt(0).toUpperCase() + userName.slice(1);
  };

  const user = new UserSchema({
    name: capitalize(),
    email: req.body.email,
    password: hashedPassword,
  });
  const jwt_token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" },
    { algorythm: "RS256" }
  );
  const jwt_refresh_token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
    { algorythm: "RS256" }
  );
  user
    .save()
    .then((result) => {
      return res.status(200).json({
        response: "User was created successfully",
        user: result,
        jwt_token: jwt_token,
        jwt_refresh_token,
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ response: "Failed" });
    });
};

module.exports.LOGIN = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    // console.log(user);
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordMatch) {
      const jwt_token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        { algorythm: "RS256" }
      );
      const jwt_refresh_token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        { algorythm: "RS256" }
      );
      return res.status(200).json({
        status: "login successfull",
        jwt_token: jwt_token,
        jwt_refresh_token,
      });
    }
  } catch (err) {
    console.log("req.body", req.body);

    console.log("err", err);
    return res.status(401).json({ status: "login failed" });
  }
};

module.exports.GET_NEW_TOKEN = async (req, res) => {
  const jwt_refresh_token = req.headers.jwt_refresh_token;
  jwt.verify(jwt_refresh_token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      const new_jwt_token = jwt.sign(
        {
          email: decoded.email,
          userId: decoded.userId,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        { algorythm: "RS256" }
      );

      return res.status(200).json({
        status: "JWT Token has been refreshed",
        new_jwt_token,
        jwt_refresh_token,
      });
    } else {
      return res.status(400).json({ status: "Please use login endpoint" });
    }
  });
};
