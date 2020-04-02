require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const names = [{
    username: "Rajiv",
    age: 28
}, {
    username: "Ravi",
    age: 25
}, {
    username: "priya",
    age: 16
}]


app.get('/auth', authenticateToken , (req, res) => {
    res.json(names.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token", token)
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user;
      next()
    })
  }
  
app.listen(3000)
