const fs = require('fs')
let globalConfig = require('./config')

let controllerSet = []

let pathMap = new Map()

let files = fs.readdirSync(globalConfig['web_path'])

for (let i = 0; i < files.length; i ++){
    let temp = require('./' + globalConfig['web_path'] + '/' + files[i])
    if (temp.path) {
        for (let [key, value] of temp.path ) {
            if(pathMap.get(key) == null) {
                pathMap.set(key, value)
            } else {
                throw new Error('url path 异常， path： ' + key )
            }
            controllerSet.push(temp)
        }
    }
}

console.log(pathMap);
console.log(controllerSet);
module.exports = pathMap

