import express from "express";
import { postContent } from "../controllers/contentController.js";
import { createComment } from "../controllers/commentController.js";


const router = express.Router();
router.post('/post', postContent);
router.post('/comments', createComment);

export default router;