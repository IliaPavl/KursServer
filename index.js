const express = require('express')
const app = express()

const PORT = process.env.PORT || 3005

app.get('/', (reg,res)=>{
    res.end('<h1> Home</h1>'+
    '<div> <ul><li><a href ="/about"> Apout Pagr</li></ul></div>')
})

app.get('/about', (reg,res)=>{
    res.end('<h1> About</h1>'+
    '<div> <ul><li><a href ="/"> Home Pagr</li></ul></div>')
})

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()