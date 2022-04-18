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
Router.post('/blog/create', middleware.stripToken, middleware.verifyToken, controller.CreateBlog)
//Update Blog Post
Router.put('/blog/update/:blog_id', middleware.stripToken, middleware.verifyToken,controller.EditBlog)
//Delete Blog Post
Router.delete('/blog/delete/:blog_id', middleware.stripToken, middleware.verifyToken, controller.DeleteBlog)

//##################  COMMENT ROUTE  ######################//
//Create New Comment
Router.post('/comment/new/:author_id/:blog_id', middleware.stripToken, middleware.verifyToken, controller.PostComment)
//Edit Comment
Router.put('/comment/edit/:comment_id', middleware.stripToken, middleware.verifyToken, controller.EditComment)
//Like Comment
Router.put('/comment/like/:comment_id',  middleware.stripToken, middleware.verifyToken, controller.LikeComment)
//Dislike Comment
Router.put('/comment/dislike/:comment_id',  middleware.stripToken, middleware.verifyToken, controller.DislikeComment)
//Delete Comment
Router.delete('/comment/delete/:comment_id', middleware.stripToken, middleware.verifyToken, controller.DeleteComment)

// //##################  REPLY ROUTE  ######################//
// Router.post()
// Router.put()
// Router.delete()



module.exports = Router