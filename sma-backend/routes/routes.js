import {Router} from "express";
import authRoute from "./auth.route.js";
import postsRoute from "./posts.route.js";
import authentication from "../middlewares/authentication.js";
const router = Router()


router.use("/auth",authRoute)
router.use(authentication)
router.use("/posts",postsRoute)
router.patch("/posts", postsRoute);
router.delete("/posts", postsRoute);

export default router;