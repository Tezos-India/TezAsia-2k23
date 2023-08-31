const express = require('express')
const cors = require('cors')

require('./mongo/db')

const app = express()

const userRouter = require('./routes/userRouter')
const theatreRouter = require('./routes/theatreRouter')
const movieRouter = require('./routes/movieRouter')

app.use(cors())
app.use(express.json())

app.use('/user',userRouter)  
app.use('/theatre',theatreRouter)  
app.use('/movie',movieRouter)

const port = 8000
app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})