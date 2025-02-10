import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const authentication = (req, res, next) => {
    const authToken = req.headers.authorization
    const token = authToken.split(" ")[1]
    jwt.verify(token, process.env.jwtsecretcode, async (error, decoded) => {
        if (error) {
            next(error);
        } else {
            req.body.user = decoded.data;
            // const roleData = await prisma.role.findFirst({
            //     where:{
            //         id: decoded.data.roleId
            //     },
            //     include:{
            //         permission: true
            //     }
            // })
            // req.body.user.permissions = roleData.permission.map((p)=>{return `${p.action}-${p.claim}`})
            next();
        }
    });

}


export default authentication;