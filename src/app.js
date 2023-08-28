var express = require('express')
var cors = require('cors')
var app = express()
var router = express.Router()
const PORT = process.env.PORT || 5000
require('../connection/connection')
const userRouters = require('../routers/userRoutes')
const feedRouters = require('../routers/feedRoutes')

const {Middleware} = require('../middleware/middleware')

app.use(cors())
app.use(express.json({type: ['application/json', 'text/plain']}))
app.use(express.urlencoded({extended:true}))


router.get('/',userRouters.home)
router.post('/login',userRouters.login)
router.post('/signup',userRouters.signup)
router.delete('/logout',userRouters.logout)

router.get('/feed',feedRouters.showFullFeed)
router.post('/feed',Middleware,feedRouters.postAFeed)
router.get('/feed/:id',feedRouters.getFeed)
router.put('/feed',Middleware,feedRouters.putFeed)
router.get('/myfeed',Middleware,feedRouters.getMyFeed)
router.delete('/delete/:id',Middleware,feedRouters.deleteMyFeed)

app.use(router)

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})

