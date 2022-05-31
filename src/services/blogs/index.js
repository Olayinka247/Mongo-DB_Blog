import express from "express";
import creatError from "http-errors";
import Blog from "./model.js";

const blogPostRouter = express.Router();

blogPostRouter.post("/", async (req, res, next) => {});
blogPostRouter.get("/", async (req, res, next) => {});
blogPostRouter.get("/", async (req, res, next) => {});
blogPostRouter.put("/", async (req, res, next) => {});
blogPostRouter.delete("/", async (req, res, next) => {});

export default blogPostRouter;
