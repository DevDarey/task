const express = require('express')
require('./src/db/todo-db')
const Task = require('./src/models/task')
const taskRouter = require('./src/routers/task')
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(taskRouter)
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})
