import {Router} from "express";
import authRoute from "./auth.route.js";
import postsRoute from "./posts.route.js";
import authentication from "../middlewares/authentication.js";
import EventEmitter from "events";
const router = Router()

const eventEmit = new EventEmitter();
let count = 0
eventEmit.on("countApi", () => {
    count += 1;
    console.log("Count: ", count)
})

router.use((req, res, next) => {
    eventEmit.emit("countApi")
    next();
})


router.use("/auth",authRoute)
router.use(authentication)
router.use("/posts",postsRoute)
router.patch("/posts", postsRoute);
router.delete("/posts", postsRoute);

export default router;