const express = require('express')
const Database = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const app = express()
require('dotenv').config()
app.use(express.json())
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server started successfully ${PORT}`)
})
//routers
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/blog', blogRoutes)
//default routes
app.get('/', (req, res) => {
  res.send('server started successfully')
})

Database()
