
const everydayDao = require('../dao/everydayDao')
const getTime = require('../utils/getTimeUtil')
const writeResult = require('../utils/returnDataUtil')
let path = new Map()

function editEveryDay(req, res) {
    req.on("data", function (data) {
        everydayDao.insertEveryDay(data.toString().trim(), getTime(), function (result) {
            res.writeHead('200');
            res.write(writeResult.writeResult('success', "add succeed", null))
            res.end()
        })
    })
}

function queryEveryDay(req, res) {
    everydayDao.queryEveryDay(function (result) {
        res.writeHead('200')
        res.write(writeResult.writeResult('success', 'query succeed', result))
        res.end()
    })
}

path.set('/editEveryDay', editEveryDay)
path.set('/queryEveryDay', queryEveryDay)


module.exports.path = path
