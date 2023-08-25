var mongoose = require('mongoose')

mongoose.connect('mongodb://sai:Saisai99122@cluster0-shard-00-00.0fn1n.mongodb.net:27017,cluster0-shard-00-01.0fn1n.mongodb.net:27017,cluster0-shard-00-02.0fn1n.mongodb.net:27017/?ssl=true&replicaSet=atlas-12uddp-shard-0&authSource=admin&retryWrites=true&w=majority').then((mg)=>{
    console.log('Database connected')
}).catch((e)=>{
    console.log('Unable to connect database')
})

