const Router = require('express').Router()


//Calls Blog Orders by Date Created
Router.get('blog/all')
//Blog Endpoint, Pulls Comments
Router.get('/blog/:blog_id')
//Update Blog Post
Router.put('/blog/update/:blog_id')
//Create New Blog
Router.post('/blog/create')
//Delete Blog Post
Router.delete('/blog/delete/:blog_id')






module.exports = Router