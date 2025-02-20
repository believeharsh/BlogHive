import express from "express";
import { followAnAuthor, isAlreadyFollwing, unFollowAnAuthor } from "../controllers/follow.js";
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js";


const followRoute = express.Router();

followRoute.post("/follow-an-author/:authorId", verifyUserJwtToken, followAnAuthor)
followRoute.delete("/unfollow-an-author/:authorId", verifyUserJwtToken , unFollowAnAuthor) 
followRoute.get("/isAlreadyFollowing/:authorId", verifyUserJwtToken, isAlreadyFollwing)

export default followRoute
