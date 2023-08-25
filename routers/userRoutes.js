const models = require('../models/models')
const utils = require('../utils/utile')


const home = async (req,res)=>{
    try {
        res.send('Hello')
    } catch (err) {
        res.send('something went wrong')
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = {...req.body}

        let user = await models.userModel.find({email,password})
        let token = req.headers.authorization.split(' ')[1]
        if(user.length === 0) {
            return res.json({'msg':'Email or password is incorrect.'})
        }
        if(!token){
            token = utils.genToken({email})
            await models.userModel.updateOne({email},{$push:{tokens:{tkn:token}}})
            return res.json({tkn:token,authorialName:user[0].authorialName})
        }
        let status = utils.verifyToken(token)
        
        if(status.expired) {
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
            }
            await models.userModel.findOneAndUpdate({email},{tokens})
            return res.json({'msg':'Token Expired'})
        }

        res.json({'msg':'Already Logged In.'})

    } catch (err) {
        
        res.json({'msg':'Something went wrong'})        
    }
}

const signup = async (req,res)=>{

    try {

        const {name,email,password,authorialName} = {...req.body,name:req.body.email.split('@')[0]}
        var user =await new models.userModel({name,email,password,authorialName})
        await user.save()
        res.json({'msg':'Account registered!'})

    } catch (err) {

        var errors = {}
        
        if(err.message.split(' ')[1] === 'duplicate'){
            errors[err.message.split(' ')[11].split(':')[0]]=`${err.message.split(' ')[11].split(':')[0]} already exists.`
        }
        for(let i in err.errors){
            errors[i] = err.errors[i].message.split('`')[1]+err.errors[i].message.split('`')[2]
        }
        res.json(errors)

    }
}

const logout = async(req,res)=>{
    try {
        let tkn = req.headers.authorization.split(' ')[1]

        let {email} = (utils.decodeToken(tkn)).payload
        let splice_index = -1
        let tokens = (await models.userModel.find({email}))[0].tokens
            for(let i=0;i<tokens.length;i++){
                if(tokens[i].tkn === tkn){
                    splice_index = i
                    break
                }
            }
            if(splice_index>-1){
                tokens.splice(splice_index,1)
                await models.userModel.findOneAndUpdate({email},{tokens})
            }
        res.json({'msg':'Logged out!'})

    } catch (err) {
        console.log(err)
        res.json({'msg':'gone wrong'})
    }
}

module.exports = {
    home,
    logout,
    login,
    signup
}