import express from "express";
import createError from "http-errors";
import UserModel from "./model.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:userId", async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
userRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.userId);
    if (deletedUser) {
      res.status(204).send();
    } else {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default userRouter;
