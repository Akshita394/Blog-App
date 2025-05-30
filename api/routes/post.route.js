import express from 'express';
import { create, deletePost, getPosts, updatePost } from '../controllers/post.controller.js';
import {verifyToken} from '../utils/verifyUser.js'

const router = express.Router();
router.post('/create', verifyToken, create);
router.get('/getposts',getPosts)
router.delete('/deletepost/:postId/:userId', verifyToken ,deletePost)
router.put('/updatepost/:postId/:userId', verifyToken, updatePost); // Assuming 'create' is used for updating as well
export default router;