let globalConfig = require('./config')
const loader = require('./loader')
const express = require('express')
let app = new express()
app.use(express.static('./page/'))
app.post('/editEveryDay', loader.get('/editEveryDay'))
app.get('/queryEveryDay', loader.get('/queryEveryDay'))

app.listen(globalConfig.port, function () {
    console.log('service start');
})
