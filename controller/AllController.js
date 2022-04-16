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
        const blog = await Blog.findByPk(req.params.blog_id)
        res.send(blog)
    } catch (error) {
      throw error
    }
}

const CreateBlog = async (req, res) => {
    try {
      const blog = await Blog.create({...req.body})
      console.log(blog)
      res.send(blog)
    } catch (error) {
      throw error
    }
}

const EditBlog = async (req, res) => {
  try {
    const upd = req.params.blog_id
    const blog = await Blog.findByPk(upd)
      blog.update({...req.body})
      res.send(blog)
  } catch (error) {
    throw error
  }
}

const DeleteBlog = async (req, res) => {
try {
  const del = req.params.blog_id
  const blog = await Blog.findOne({attributes: ["title"], where: { id: del }})
    await Blog.destroy({ where: { id: del }})
    res.send({message: `Your blog with a title of "${blog.dataValues.title}" has been deleted`})
} catch (error) {
 throw error
}
}


module.exports = {
  GetAllBlogs,
  GetBlogById,
  CreateBlog,
  EditBlog,
  DeleteBlog
}