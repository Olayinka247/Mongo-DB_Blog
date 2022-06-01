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

//add comment section
blogPostRouter.post("/:blogId/comments", async (req, res, next) => {
  try {
    const blogComment = await Blog.findById(req.params.blogId, { _id: 0 });
    if (blogComment) {
      const createdComment = {
        ...blogComment.toObject(),
        commentDate: new Date(),
        ...req.body,
      };
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        { $push: { comments: createdComment } },
        { new: true, runValidators: true }
      );
      res.send(updatedBlog);
    } else {
      next(createError(404, `Blog with id ${req.params.blogId} not found `));
    }
  } catch (error) {
    next(error);
  }
});

// get comment
blogPostRouter.get("/:blogId/comments/", async (req, res, next) => {
  try {
    const blogComments = await Blog.findById(req.params.blogId, {
      _id: 0,
      comments: 1,
    });
    if (blogComments) {
      res.send(blogComments.comments);
    } else {
      next(createError(404, `Blog with id ${req.params.blogId} not found `));
    }
  } catch (error) {
    next(error);
  }
});

// get comment by ID
blogPostRouter.get("/:blogId/comments/:commentId", async (req, res, next) => {
  try {
    const blogComment = await Blog.findById(req.params.blogId);
    if (blogComment) {
      const foundComment = blogComment.comments.find(
        (comment) => comment._id.toString() === req.params.commentId
      );
      if (foundComment) {
        res.send(foundComment);
      } else {
        next(
          createError(404, `Comment with id ${req.params.commentId} not found`)
        );
      }
    } else {
      next(createError(404, `Blog with id ${req.params.blogId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

// update comment

blogPostRouter.put("/:blogId/comments/:commentId", async (req, res, next) => {
  try {
    const blogComment = await Blog.findById(req.params.blogId);
    if (blogComment) {
      const index = blogComment.comments.findIndex(
        (comment) => comment._id.toString() === req.params.commentId
      );
      if (index !== -1) {
        blogComment.comments[index] = {
          ...blogComment.comments[index],
          ...req.body,
        };
        const updatedBlogComment = await blogComment.save();
        res.send(updatedBlogComment);
      } else {
        next(
          createError(404, `Comment with id ${req.params.commentId} not found!`)
        );
      }
    } else {
      next(createError(404, `Blog with id ${req.params.blogId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

// delete comment

blogPostRouter.delete(
  "/:blogId/comments/:commentId",
  async (req, res, next) => {
    try {
      const blogComment = await Blog.findByIdAndUpdate(
        req.params.blogId,
        {
          $pull: {
            comments: {
              _id: req.params.commentId,
            },
          },
        },
        { new: true }
      );
      if (blogComment) {
        res.status(204).send();
      } else {
        next(createError(404, `Blog with id ${req.params.blogId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

export default blogPostRouter;
