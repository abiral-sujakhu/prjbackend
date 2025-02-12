import { PrismaClient } from "@prisma/client";
import EventEmitter from "events";

const prisma = new PrismaClient();

const eventEmitter=new EventEmitter();

eventEmitter.on("greet", (message) => {
    console.log("Hello! Good Morning!");
    console.log("Message: ", message)
})



const createPosts = async (req) => {
    eventEmitter.emit("greet", "Create Post Called")
  const { content } = req.body;
  console.log("Server at  createpost service");
  console.log("req.body: ", req.body);
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
    eventEmitter.emit("greet", "List Post Called")
  const userId = req.body.userId; // Logged-in user's ID
  const searchParams = req.query.search?.trim() || '';

  const result = await prisma.post.findMany({
      where: {
          userId: userId, // Filter posts by logged-in user's ID
          OR: [
              {
                  content: {
                      contains: searchParams,
                      mode: 'insensitive'
                  }
              },
              {
                  User: { // Ensure this matches your schema
                      fullName: {
                          contains: searchParams,
                          mode: 'insensitive'
                      }
                  }
              }
          ]
      },
      include: {
          User: { // Fetch related user data
              select: {
                  id: true,
                  fullName: true,
                  email: true,
                  createdAt: true
              }
          }
      },
      orderBy: {
          createdAt: 'desc' // Order by newest posts first
      }
  });

  return result ;

};

// likecount upodate 
//newpost update

const updatePosts = async (req) => {
    eventEmitter.emit("greet", "Update Post Called")
    const {content,id,like} = req.body;
    const postId = req.params.id; // Fix: Extract `id` correctly

    const checkPostExist = await prisma.post.findFirst({
        where: { id: +postId }
    });

    if (!checkPostExist) {
        return { message: "Post does not exist" };
    }
    if (like){
        const likecount1=checkPostExist.likesCount+1
        const result =await prisma.post.update({
            where :{
                id: +postId
            },
            data:{
                likesCount:likecount1
                },
                include:{
                    User:true
                }
        })
        return {result}
    }
    const result = await prisma.post.update({
        where: { id: +postId },
        data: { content },
        include: { User: true }
    });

    return { result };
};
const deletePosts = async (req) => {
    eventEmitter.emit("greet", "Delete Post Called")
const postId = req.params.id;
    
        const checkPostExist = await prisma.post.findFirst({
            where: { id: +postId }
        });
    
        if (!checkPostExist) {
            return { message: "Post does not exist" };
        }
    
        await prisma.post.delete({
            where: { id: +postId }
        });
    
        return { message: "Post deleted successfully" };
    };
  
export { createPosts,listPosts,updatePosts,deletePosts };
