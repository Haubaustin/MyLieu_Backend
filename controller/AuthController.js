const { Author } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      author &&
      (await middleware.comparePassword(author.password, req.body.password))
    ) {
      let payload = {
        id: author.id,
        email: author.email
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
    const { email, register_password, username } = req.body
    let password = await middleware.hashPassword(register_password)
    const author = await Author.create({ email, password, username })
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

module.exports = {
  Login,
  Register,
  UpdatePassword,
  CheckSession
}
