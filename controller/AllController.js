const { Author, Blog, Comment, Reply } = require('../models')
const { Op, sequelize, } = require("sequelize");

const template = async (req, res) => {
  try {
    
  } catch (error) {
    throw error
  }
}

const GetAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
          order: [['createdAt', 'DESC']],
          include: [{model: Author, attributes: ['username']}]
        })
        res.send(blogs)
    }catch (error) {

        throw error
    }
}

const GetBlogByAuthId = async (req, res) => {
try {
  const blog = await Blog.findAll({ include: [{model: Author, attributes: ['username', 'profilepic']}], where: {author_id: req.params.author_id}})
  res.send(blog)
} catch (error) {
 throw error
}
}

const GetBlogById = async (req, res) => {
    try {
        const blog = await Blog.findOne({
          where: {id: req.params.blog_id},
          include: [
            {model: Author, attributes: ["username", 'profilepic']},
            {
              model: Comment,
              include: [
                {
                  model: Author, attributes: ["username", 'profilepic']
                },
                {
                  model: Reply,
                include: {
                  model: Author, attributes: ["username", 'profilepic']
                }}]},]})
        res.send(blog)
    } catch (error) {
      throw error
    }
}

const CreateBlog = async (req, res) => {
    try {
      const blog = await Blog.create({...req.body})
      res.send({ msg: 'Blog succesfully posted' })
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
      let blog_id = parseInt(req.params.blog_id)
      let author_id = parseInt(req.params.author_id)
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
      const upd = parseInt(req.params.comment_id)
      const editComment = await Comment.findByPk(upd)
        editComment.update({...req.body})
        res.send(editComment)
    } catch (error) {
      throw error
    }
  }

  const DeleteComment = async (req, res) => {
    try {
      const del = parseInt(req.params.comment_id)
      const delComment = await Comment.destroy({ where: { id: del }})
        res.send({message: `Your comment has been deleted`})
    } catch (error) {
     throw error
    }
    }

//######################## Reply Controllers #######################\\
const PostReply = async (req, res) => {
  try {
      let comment_id = parseInt(req.params.comment_id)
      let author_id = parseInt(req.params.author_id)
      let replyBody = {
      comment_id,
      author_id,
      ...req.body
   }
      const postReply = await Reply.create(replyBody)
      res.send(postReply)
  } catch (error) {
      throw error
  }
}

const LikeReply = async (req, res) => {
  try {
      let replyId = parseInt(req.params.reply_id)
      let likeReply = await Reply.increment("likes", {
        where: { id: replyId },
        returning: true
      })
      res.send(likeReply)
    } catch (error) {
      throw error
    }
  }

  const DislikeReply = async (req, res) => {
    try {
        let replyId = parseInt(req.params.reply_id)
        let dislikeReply = await Reply.decrement("likes", {
          where: { id: replyId },
          returning: true
        })
        res.send(dislikeReply)
      } catch (error) {
        throw error
      }
    }

  const EditReply = async (req, res) => {
    try {
      const upd = parseInt(req.params.reply_id)
      const editReply = await Reply.findByPk(upd)
        editReply.update({...req.body})
        res.send(editReply)
    } catch (error) {
      throw error
    }
  }

  const DeleteReply = async (req, res) => {
    try {
      const del = parseInt(req.params.reply_id)
      const delReply = await Reply.destroy({ where: { id: del }})
        res.send({message: `Your reply has been deleted`})
    } catch (error) {
     throw error
    }
    }

  //%%%%%%%%%%%%%%%%%%%%%% Notifications
  const Notifications = async (req, res) => {
  try {
    const auth = await Author.findOne({ where: {id: parseInt(req.params.user_id)}})
    const notif = await Blog.findAll({
        where: {author_id: auth.id},
          include: [{
            model: Comment,
              where: 
                {createdAt: {
                  [Op.gt]: auth.lastlogout
                }},
                include: [{model: Author, attributes: ['username']}]

          }]
    })
    const amount = await Blog.count({
      where: {author_id: auth.id},
        include: [{
          model: Comment,
            where: 
              {createdAt: {
                [Op.gt]: auth.lastlogout
              }}
        }]
  }) 
    res.send([notif, {notifications: amount}])
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
  DeleteComment,
  PostReply,
  LikeReply,
  DislikeReply,
  EditReply,
  DeleteReply,
  GetBlogByAuthId,
  Notifications
}