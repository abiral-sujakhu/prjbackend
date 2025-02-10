const checkPermission = (permission) => {
    return (req,res,next)=>{
        const user = req.body.user
        if(user.role.name=="Admin"){
            next();
        }
        if(user.permissions.includes(permission)){
            next()
        }else{
            next("You are not allowed to access this resources!")
        }
    }
}

export {checkPermission}
