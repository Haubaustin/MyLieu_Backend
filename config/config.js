require('dotenv').config()
module.exports = {
  development: {
    database: 'mylieu_database',
    dialect: 'postgres',
    password: 'password'

  },
  test: {
    database: 'mylieu_database_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}