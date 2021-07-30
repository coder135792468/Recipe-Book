import mongoose from "mongoose";

const checkID = (ID) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[ID])) {
    return res.status(400).json({
      msg: "Invalid ID",
    });
  }
  next();
};

export default checkID;
