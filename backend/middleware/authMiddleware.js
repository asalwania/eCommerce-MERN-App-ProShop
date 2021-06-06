import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user =  await User.findById(decoded.id).select("-password");
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not Authorized,token failed");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    next();
  } catch (error) {
    res.send(error.message);
  }
};
