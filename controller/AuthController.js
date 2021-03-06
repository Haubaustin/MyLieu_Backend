const { Author } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      author &&
      (await middleware.comparePassword(author.password, req.body.password))
    ) {
      let payload = {
        id: author.id,
        username: author.username
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { email, register_password, username, profilepic } = req.body

    const user = await Author.findOne({ where: {username: req.body.username} })
    
    if (user) {
      return res.send({ message: "Username already in use"})
    }
      
    let password = await middleware.hashPassword(register_password)
    const author = await Author.create({ email, password, username, profilepic })
    res.send(author)
  } catch (error) {
    throw error
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const author = await Author.findByPk(req.params.author_id)
    if (
      author &&
      (await middleware.comparePassword(
        author.dataValues.password,
        oldPassword
      ))
    ) {
      let password = await middleware.hashPassword(newPassword)
      await author.update({ password })
      return res.send({ status: 'Ok', payload: author })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {}
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const Logout = async (req, res) => {
try {
  const author = await Author.findOne({
    where: { id: req.body.id }})
    author.update({lastlogout: req.body.lastlogout})
    res.send("logout")
} catch (error) {
 throw error
}
}

module.exports = {
  Login,
  Register,
  UpdatePassword,
  CheckSession,
  Logout
}
