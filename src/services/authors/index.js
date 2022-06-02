import express from "express";
import createError from "http-errors";
import AuthorsModel from "./model.js";

const authorsRouter = express.Router();

authorsRouter.post("/", async (req, res, next) => {
  try {
    const author = new AuthorsModel(req.body);
    const { _id } = await author.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await AuthorsModel.find();
    res.send(authors);
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const author = await AuthorsModel.findById(authorId);
    if (author) {
      res.send(author);
    } else {
      next(
        createError(404, `Author with id ${req.params.authorId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authorUpdate = await AuthorsModel.findByIdAndUpdate(
      req.params.authorId,
      req.body,
      { new: true, runValidators: true }
    );
    if (authorUpdate) {
      res.send(authorUpdate);
    } else {
      next(
        createError(404, `Author with id ${req.params.authorId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    const deletedUser = await AuthorsModel.findByIdAndUpdate(
      req.params.authorId
    );
    if (deletedUser) {
      res.status(204).send();
    } else {
      next(createError(404, `User with id ${req.params.authorId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
