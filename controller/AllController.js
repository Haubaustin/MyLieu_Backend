const { Author, Blog, Comment, Reply } = require('../models')

const template = async (req, res) => {
  try {
    
  } catch (error) {
    throw error
  }
}

const GetAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        res.send(blogs)
    }catch (error) {

        throw error
    }
}

const GetBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(res.params.blog_id)
        res.send(blog)
    } catch (error) {
      throw error
    }
}

const CreateBlog = async (req, res) => {
    try {
      const blog = await Blog.create({...req.body})
      res.send(blog)
    } catch (error) {
      throw error
    }
}


module.exports = {
  GetAllBlogs,
  GetBlogById,
  CreateBlog,

}