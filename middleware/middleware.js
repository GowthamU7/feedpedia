const utils = require('../utils/utile')
const models = require('../models/models')

async function Middleware(req,res,next){
    try {
        let token = req.headers.authorization.split(' ')[1]
        let status = utils.verifyToken(token)
        if(!token) return res.json({'msg':'Token Expired!'})
        if(status.expired){
            let {email} = (utils.decodeToken(token)).payload
            let splice_index = -1
            let tokens = (await models.userModel.find({email}))[0].tokens
            for(let i=0;i<tokens.length;i++){
                if(tokens[i].tkn === token){
                    splice_index = i
                    break
                }
            }
            if(splice_index>-1){
                tokens.splice(splice_index,1)
                await models.userModel.findOneAndUpdate({email},{tokens})
            }
            return res.json({'msg':'Token Expired!'})
        }
        next()
    } catch (err) {
        res.json({'msg':'something went wrong.'})
    }
}



module.exports = {Middleware}