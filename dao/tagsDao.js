let dbutil = require('./DBUtil')

function queryTag(tag, success) {
    let sql = "select * from tag where tag = ?;"
    let params = [tag]
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
function insertTags(tag, ctime, utime, success) {
    let sql = "insert into tag (`tag`, `ctime`, `utime`) values (?, ?, ?);"
    let params = [tag, ctime, utime]
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

module.exports.insertTags = insertTags
module.exports.queryTag = queryTag

