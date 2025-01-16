import { Router } from "express";
import {protectRoute} from '../middlewares/auth.middleware.js';
import { getUsers,getMessages,sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.get('/users', protectRoute, getUsers);
router.get('/chat/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);
export default router;