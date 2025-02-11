import { Router } from "express";
import {createPosts,listPosts,updatePosts,deletePosts} from "../services/posts.services.js";

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

router.patch("/:id", async (req, res) => {
  try {
      const result = await updatePosts(req)
      res.send(result)
  } catch (error) {
      console.log("Error at login: ", error)
      res.status(400).send({
          message: "Error Occured",
          error: error
      });
  }
})
router.delete("/:id", async (req, res) => {
  try {
      const result = await deletePosts(req);
      res.send(result);
  } catch (error) {
      console.log("Error at deleting post: ", error);
      res.status(400).send({
          message: "Error Occurred",
          error: error
      });
  }
});

export default router;
