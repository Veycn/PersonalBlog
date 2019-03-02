let globalConfig = require('./config')
const loader = require('./loader')
const express = require('express')
let app = new express()
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})
// app.use(express.static('./page/dist'))

app.post('/editEveryDay', loader.get('/editEveryDay'))
app.get('/queryEveryDay', loader.get('/queryEveryDay'))
app.post('/editBlog', loader.get('/editBlog'))
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'))
app.get('/getArticleCount', loader.get('/queryArticleCount'))
app.get('/queryArticleById', loader.get('/queryArticleById'))

app.listen(globalConfig.port, function () {
    console.log('service start');
})
