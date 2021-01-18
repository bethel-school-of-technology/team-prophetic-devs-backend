router.get('/profile', async (req, res, next) => {
    console.log(req.headers);
    let myToken = req.headers.authorization;
    console.log(myToken);
        if(myToken){
        let currentGroupie = await tokenService.verifyToken(myToken);
        console.log(currentGroupie);
        if(currentGroupie){
        //ROUTE LOGIC GOES HERE
        
        }
        else{
            res.json({
            message: "Token is invalid or expired",
            status: 403
            })
        }
    }
    else{
        res.json({
        message: "No token received",
        status: 403
    })
    }
})