import express from "express";
import createError from "http-errors";
import Blog from "./model.js";

const blogPostRouter = express.Router();

blogPostRouter.post("/", async (req, res, next) => {
  try {
    const blogPost = new Blog(req.body);
    const { _id } = await blogPost.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

blogPostRouter.get("/", async (req, res, next) => {
  try {
    const blogPost = await Blog.find();
    res.send(blogPost);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.get("/:blogId", async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blogPost = await Blog.findById(blogId);
    if (blogPost) {
      res.send(blogPost);
    } else {
      next(createError(404, `Blog with id ${req.params.blogId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
blogPostRouter.put("/:blogId", async (req, res, next) => {
  try {
    const updatePost = await Blog.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatePost) {
      res.send(updatePost);
    } else {
      next(createError(404, `Blog with id ${req.params.blogId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

blogPostRouter.delete("/:blogId", async (req, res, next) => {
  try {
    const deletePost = await Blog.findByIdAndDelete(req.params.blogId);
    if (deletePost) {
      res.status(204).send();
    } else {
      next(createError(404, `Blog with id ${req.params.blogId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default blogPostRouter;
