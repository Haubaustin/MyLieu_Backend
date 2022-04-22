const Router = require('express').Router()
const controller = require('../controller/AllController')
const authController = require('../controller/AuthController')
const middleware = require('../middleware')

//##################  AUTHENTICATION ROUTE  ######################//
Router.post('/register', authController.Register)
Router.put('/logout', authController.Logout)
Router.post('/login', authController.Login)
Router.get('/session', middleware.stripToken, middleware.verifyToken, authController.CheckSession)

//##################  BLOG ROUTE  ######################//
//Calls Blog Orders by Date Created. Homepage
Router.get('/blog/all', controller.GetAllBlogs)
//Blog Endpoint, Pulls comments, Where user reads article
Router.get('/blog/:blog_id', controller.GetBlogById)
//Author Mypage. Find Blog by Author Id
Router.get('/blog/author/:author_id', controller.GetBlogByAuthId)
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
Router.put('/comment/like/:comment_id', middleware.stripToken, middleware.verifyToken, controller.LikeComment)
//Dislike Comment
Router.put('/comment/dislike/:comment_id', middleware.stripToken, middleware.verifyToken, controller.DislikeComment)
//Delete Comment
Router.delete('/comment/delete/:comment_id', middleware.stripToken, middleware.verifyToken, controller.DeleteComment)

// //##################  REPLY ROUTE  ######################//
//Create New Reply
Router.post('/reply/new/:author_id/:comment_id', middleware.stripToken, middleware.verifyToken, controller.PostReply)
//Edit Reply
Router.put('/reply/edit/:reply_id', middleware.stripToken, middleware.verifyToken, controller.EditReply)
//Like Reply
Router.put('/reply/like/:reply_id', middleware.stripToken, middleware.verifyToken, controller.LikeReply)
//Dislike Reply
Router.put('/reply/dislike/:reply_id', middleware.stripToken, middleware.verifyToken, controller.DislikeReply)
//Delete Reply
Router.delete('/reply/delete/:reply_id', middleware.stripToken, middleware.verifyToken, controller.DeleteReply)

// //##################  Notifications ROUTE  ######################//
Router.get('/notifications/:user_id', controller.Notifications)


module.exports = Router