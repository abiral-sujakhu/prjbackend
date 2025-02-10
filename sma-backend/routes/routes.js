import {Router} from "express";
import authRoute from "./auth.route.js";
import postsRoute from "./posts.route.js";
import authentication from "../middlewares/authentication.js";
const router = Router()


router.use("/auth",authRoute)
router.use("/posts",postsRoute)


export default router;