import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const createPosts = async (req) => {
  const { content } = req.body;
  console.log("Server at  createpost service");
  const result = await prisma.post.create({
    data: {
      content,
      userId: req.body.user.id
    },
    include:{
      User:true
    }
  });

  return { result }; //creation of a post
};
const listPosts = async (req) => {
  const posts = await prisma.post.findMany({
    include:{
      User:true
    }
  });
  return { result }; //list of posts
}
export { createPosts,listPosts };
