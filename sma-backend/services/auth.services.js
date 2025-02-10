import { PrismaClient } from '@prisma/client'
import "dotenv/config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const login = async (req) =>{
    const {email, password} = req.body;

    const user = await prisma.user.findFirst({
        where:{
            email: email
        },  
    })
    if(!user){
        return("User of given email doesnot exists!");
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if(err){
            return("Password doesnot match!");
        }
    });
    // if(password != user.password){
    // }
    const token=jwt.sign(
        { expiresIn:"1d",data:user},
         process.env.jwtsecretcode
 );

    return {token,user}; //token: token
}

const register = async (req) => {
    const { id,email, password, fullName, gender} = req.body
    // password = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data:{
            id,
            email,
            password,
            fullName,
            gender,
            }
        })

    return{user,token};
}

const getUser = async (req) => {
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
        where: {
            id: +userId
        },
    })
    if (!user) {
        return ("User of given email doesnot exists!");
    }
    return { user };
}

export {login, register,getUser}