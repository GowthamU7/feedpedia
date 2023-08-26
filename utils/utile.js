var jwt = require('jsonwebtoken')
const SECRET_KEY = "enfohf8034gh34bvu4vn3evnvnv0i2vieew"


function genToken(payload){
    return jwt.sign({exp:Math.floor(Date.now() / 1000)+60*5,payload},SECRET_KEY)
}


function verifyToken(token){
    var status = {'expired':false}
    try {
        jwt.verify(token,SECRET_KEY)
    } catch (error) {
        status.expired = true
    }
    return status
}

function decodeToken(token){
    return jwt.decode(token)
}


module.exports = {
    genToken,
    verifyToken,
    decodeToken
}