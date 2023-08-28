const models = require('../models/models')

const postAFeed = async (req,res)=>{
    try {
        let feedReq = {...req.body}
        let feed = await new models.feedModel({...feedReq})
        
        await feed.save()
        res.json({'msg':'Posted, Hurrey!'})
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

const showFullFeed = async (req,res)=>{

    try {
        let feed = await models.feedModel.find({})
        res.json(feed)
    } catch (err) {
        res.json({'msg':'something went wrong.'})
    }
}


const getFeed = async (req,res)=>{

    try {
        let {id} = {...req.params}
        let feed = await models.feedModel.findById(id)
        res.json(
            {
                title:feed.title,
                tagline:feed.tagline,
                body:feed.body,
                img:feed.img,
                author:feed.author
            })
    } catch (err) {
        res.json({'msg':'something went wrong.'})
    }
}

const putFeed = async (req,res)=>{
    
    try {
        let newFeedData = {...req.body}
        let errors = {img:'',title:'',body:'',tagline:''}
        if(newFeedData.img === '') errors.img = 'Image is required.'
        if(newFeedData.title === '') errors.title = 'Title is required.'
        if(newFeedData.tagline === '') errors.tagline = 'Tagline is required.'
        if(newFeedData.body === '') errors.body = 'Body is required.'
        if(errors.img !== '' || errors.title !== '' || errors.body !== '' || errors.tagline !== ''){

            return res.json({...errors})
        }
        let updatedFeed = await models.feedModel.findOneAndUpdate({_id:req.query.id},{...newFeedData})
        res.json({updatedFeed})
    } catch (err) {
        res.json({'msg':'Something went Wrong'})
    }

}


const getMyFeed = async(req,res) =>{
    try {
        let author = req.query.author
        let feed = await models.feedModel.find({author:author})
        res.json(feed)
    } catch (err) {
        res.json({'msg':'something went wrong'})
    }
} 


const deleteMyFeed = async(req,res)=>{
    try {
        let id = req.params.id
        let data = await models.feedModel.findByIdAndDelete(id)
        res.json({'msg':'post deleted'})
    } catch (err) {
        console.log({'msg':'something went wrong'})      
    }
}

module.exports = {showFullFeed,postAFeed,getFeed,putFeed,getMyFeed,deleteMyFeed}