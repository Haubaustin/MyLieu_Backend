const Router = require('express').Router()
const controller = require('../controller/AllController')
const authController = require('../controller/AuthController')
const middleware = require('../middleware')

//##################  AUTHENTICATION ROUTE  ######################//
Router.post('/register', authController.Register)
Router.post('/login', authController.Login)

//##################  BLOG ROUTE  ######################//
//Calls Blog Orders by Date Created. Homepage
Router.get('/blog/all', controller.GetAllBlogs)
//Blog Endpoint, Pulls comments, Where user reads article
Router.get('/blog/:blog_id', controller.GetBlogById)
//Create New Blog
Router.post('/blog/create', controller.CreateBlog)
//Update Blog Post
Router.put('/blog/update/:blog_id',controller.EditBlog)
//Delete Blog Post
Router.delete('/blog/delete/:blog_id', controller.DeleteBlog)

//##################  COMMENT ROUTE  ######################//
//Create New Comment
Router.post('/comment/new/:author_id/:blog_id', controller.PostComment)
//Edit Comment
Router.put('/comment/edit/:comment_id', controller.EditComment)
//Like Comment
Router.put('/comment/like/:comment_id',  controller.LikeComment)
//Dislike Comment
Router.put('/comment/dislike/:comment_id',  controller.DislikeComment)
//Delete Comment
Router.delete('/comment/delete/:comment_id', controller.DeleteComment)

// //##################  REPLY ROUTE  ######################//
// Router.post()
// Router.put()
// Router.delete()



module.exports = Router