require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const sequelize = require('./db')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 3005
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api',router)
app.use(errorMiddleware);

app.get('/', (reg,res)=>{
    res.end('<h1> Home Page</h1>'+
    '<div> <ul><li><a href ="/about"> Apout Page Ilia</li></ul></div>')
})

app.get('/about', (reg,res)=>{
    res.end('<h1> About Page</h1>'+
    '<div> <ul><li><a href ="/"> Home Pagr</li></ul></div>')
})


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {console.log(e)}
}


start()