let dbutil = require('./DBUtil')

function insertBlog(title, tags, content, views, ctime, utime, success) {
    let sql = "insert into blog (title, tags, content, views, ctime, utime) values (?,?,?,?,?,?);"
    let params = [title, tags, content, views, ctime, utime]
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

function queryBlogByPage(page, pageSize, success) {
    let sql = "select * from blog order by id desc limit ?, ?;"
    let params = [page * pageSize, pageSize]
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

function queryArticleCount(success) {
    let sql = "select count(1) from blog;"
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

function queryArticleById(aid, success) {
    let sql = "select * from blog where id = ?;"
    let params = [aid]
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
module.exports.insertBlog = insertBlog
module.exports.queryBlogByPage = queryBlogByPage
module.exports.queryArticleCount = queryArticleCount
module.exports.queryArticleById = queryArticleById
