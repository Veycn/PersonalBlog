const blogDao = require('../dao/blogDao')
const tagsDao = require('../dao/tagsDao')
const tagBlogMappingDao = require('../dao/tagBlogMappingDao')
const getTime = require('../utils/getTimeUtil')
const writeResult = require('../utils/returnDataUtil')
const url = require('url')

let path = new Map()


// editBlog 博客的提交逻辑
function editBlog(req, res) {
    let params = url.parse(req.url, true).query
    // 先格式化标签
    let tags = params.tags.replace(/ /g, "").replace("，", ",")
    req.on('data', function (data) {
        // 调用数据库接口插入博客
        blogDao.insertBlog(params.title, tags, data.toString(), 0, getTime(), getTime(), function (result) {
            res.writeHead("200")
            res.write(writeResult.writeResult("success", 'add success', null))
            res.end()
            // 插入完成之后， 又一个插入的ID， 也是博客的id
            let blogId = result.insertId
            // 获取到标签列表， 构建 tag-blog 映射
            let tagList = tags.split(',')
            for (let i = 0; i < tagList.length; i++){
                if(tagList[i] === ''){
                    continue
                }
                // 查询tag是否存在
                queryTag(tagList[i], blogId)
            }
        })
    })
}

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (res) {
        if (res == null || res.length === 0){
            // 如果不存在， 在标签表中插入标签
            insertTag(tag, blogId)
        }else {
            // 如果存在， 构建 tag-blog 映射
            insertTagBlogMapping(res[0].id, blogId)
        }
    })
}

function insertTag(tag, blogId) {
    // 在tag不存在的情况下， 将tag插入tag表中
    tagsDao.insertTags(tag, getTime(), getTime(), function (res) {
        // 插入tag之后， 构建 tag-blog 映射
        insertTagBlogMapping(res.insertId, blogId)
    })
}

// 构建映射
function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, getTime(), getTime(), function (result) {

    })
}


function queryBlogByPage(req, res) {
    let params = url.parse(req.url, true).query
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (let i = 0; i < result.length; i ++ ){
            result[i].content = result[i].content.replace(/<img [\w\W]*">/, "");
            result[i].content = result[i].content.substring(0, 300)
        }
        res.writeHead('200')
        res.write(writeResult.writeResult('success', 'query ok', result))
        res.end()
    })
}

function queryArticleCount(req, res) {
    blogDao.queryArticleCount(function (result) {
        res.writeHead('200')
        res.write(writeResult.writeResult('success', 'query ok', result))
        res.end()
    })
}

function queryArticleById(req, res) {
    let params = url.parse(req.url, true).query;
    blogDao.queryArticleById(parseInt(params.aid), function (result) {
        res.writeHead('200')
        res.write(writeResult.writeResult('success', 'query ok', result))
        res.end()
    })
}

path.set('/editBlog', editBlog)
path.set('/queryBlogByPage', queryBlogByPage)
path.set('/queryArticleCount', queryArticleCount)
path.set('/queryArticleById', queryArticleById)
module.exports.path = path
