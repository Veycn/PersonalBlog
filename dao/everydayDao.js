let dbutil = require('./DBUtil')

function insertEveryDay(content, ctime, success) {
    let sql = "insert into every_day (content,ctime) values (?,?);"
    let params = [content, ctime]
    let connection = dbutil.createConnection()
    connection.connect()
    connection.query(sql, params, (err, res) => {
        if(err == null) {
            success(res)
        } else {
            console.log(err)
        }
    })
    connection.end()
}
function queryEveryDay(success) {
    let sql = "select * from every_day order by id desc limit 1;"
    let params = []
    let connection = dbutil.createConnection()
    connection.connect()
    connection.query(sql, params, (err, res) => {
        if(err == null) {
            success(res)
        } else {
            console.log(err)
        }
    })
    connection.end()
}
module.exports.insertEveryDay = insertEveryDay
module.exports.queryEveryDay = queryEveryDay
