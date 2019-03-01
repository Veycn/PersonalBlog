const fs = require("fs")
let globalConfig = {}

let conf = fs.readFileSync("./server.conf")

let confArr = conf.toString().split("\n")

for (let i = 0; i < confArr.length; i++){
    globalConfig[confArr[i].split('=')[0]] = confArr[i].split('=')[1]
}

module.exports = globalConfig
