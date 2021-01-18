const jwt = require('jsonwebtoken');
const Groupie = require('../models/user');


var tokenService = {
    assignToken:  function(user){
        const token = jwt.sign({
            email: user.email,
            _id: user._id
            },
            'BodygaurdsGun',
            {
                expiresIn: '1h'
            }
        )
        return token;
    },
    verifyToken: function(token){
        try{
            let decoded = jwt.verify(token, 'BodygaurdsGun');
            return Groupie.findById(decoded._id);
        }
        catch(err){
            return null;
        }
    }
}


module.exports = tokenService;