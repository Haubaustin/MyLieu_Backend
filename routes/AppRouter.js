const Router = require('express').Router()
const controller = require('../controller/AllController')
const middleware = require('../middleware')


//Calls Blog Orders by Date Created. Homepage
Router.get('/blog/all', controller.GetAllBlogs)
//Blog Endpoint, Pulls comments, Where user reads article
Router.get('/blog/:blog_id', controller.GetBlogById)
//Create New Blog
Router.post('/blog/create', controller.CreateBlog)
//Update Blog Post
Router.put('/blog/update/:blog_id')
//Delete Blog Post
Router.delete('/blog/delete/:blog_id')






module.exports = Router