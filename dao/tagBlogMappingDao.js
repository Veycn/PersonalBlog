let dbutil = require('./DBUtil')


function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    let sql = "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?);"
    let params = [tagId, blogId, ctime, utime]
    let connection = dbutil.createConnection()
    connection.connect()
    connection.query(sql, params, (err, res) => {
        if (err == null) {
            success(res)
        } else {
            console.log(err);
        }
    })
    connection.end()
}

module.exports.insertTagBlogMapping = insertTagBlogMapping
