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
        const blog = await Blog.findAll({
          where: {id: req.params.blog_id},
          include: [{
            model: Comment, 
              attributes: ['author_id', 'image', 'text', 'blog_id', 'id'],
              include: {
                model: Reply,
                attributes: ['author_id', 'image', 'text', 'comment_id']
              }
            }]
            })
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


//######################## Comment Controllers #######################\\
const PostComment = async (req, res) => {
  try {
      let blog_id = req.params.blog_id
      let author_id = req.params.author_id
      let commentBody = {
      blog_id,
      author_id,
      ...req.body
   }
      const postComment = await Comment.create(commentBody)
      res.send(postComment)
  } catch (error) {
      throw error
  }
}

const LikeComment = async (req, res) => {
  try {
      let commentId = parseInt(req.params.comment_id)
      let LikeComment = await Comment.increment("likes", {
        where: { id: commentId },
        returning: true
      })
      res.send(LikeComment)
    } catch (error) {
      throw error
    }
  }

  const DislikeComment = async (req, res) => {
    try {
        let commentId = parseInt(req.params.comment_id)
        let dislikeComment = await Comment.decrement("likes", {
          where: { id: commentId },
          returning: true
        })
        res.send(dislikeComment)
      } catch (error) {
        throw error
      }
    }

  const EditComment = async (req, res) => {
    try {
      const upd = req.params.comment_id
      const editComment = await Comment.findByPk(upd)
        editComment.update({...req.body})
        res.send(editComment)
    } catch (error) {
      throw error
    }
  }

  const DeleteComment = async (req, res) => {
    try {
      const del = req.params.comment_id
      const delComment = await Comment.destroy({ where: { id: del }})
        res.send({message: `Your comment has been deleted`})
    } catch (error) {
     throw error
    }
    }

module.exports = {
  GetAllBlogs,
  GetBlogById,
  CreateBlog,
  EditBlog,
  DeleteBlog,
  LikeComment,
  PostComment,
  DislikeComment,
  EditComment,
  DeleteComment
}