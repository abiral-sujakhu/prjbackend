import { Router } from "express";
import {createPosts,listPosts} from "../services/posts.services.js";

const router = Router();
//create a post
router.post("/", async (req, res) => {
  try {
    const result = await createPosts(req);
    res.send(result);
  } catch (error) {
    console.log("Error at post creation: ", error);
    res.status(400).send({
      message: "Error Occured",
      error: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await listPosts(req);
    res.send(result);
  } catch (error) {
    console.log("Error at post listing: ", error);
    res.status(400).send({
      message: "Error Occured",
      error: error,
    });
  }
}
);

export default router;
