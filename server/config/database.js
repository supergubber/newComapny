const mongoose = require('mongoose')
const Database = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log('data base connected successfuly'))
    .catch((error) => {
      console.log('database not connected')
      console.error(error)
      process.exit(1)
    })
}

module.exports = Database
