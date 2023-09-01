import express from 'express';
import * as UserService from '../services/userService.js';

const userRouter = express.Router();

userRouter.get("/",UserService.validateToken,  UserService.getUser);
userRouter.post("/", UserService.createUser);
userRouter.get("/:id", UserService.getUerById);
userRouter.put("/:id");
userRouter.delete("/:id");

export default userRouter;