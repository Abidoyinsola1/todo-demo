const express = require('express')
const bodyParser = require('body-parser')
const https = require('https');

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

let newTask = []

app.get('/', (req, res) => {
    let today = new Date()
    let options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long'
    }
    const thisDay = today.toLocaleDateString('en-US', options)
    const url = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous?blacklistFlags=racist,sexist&type=single'
    https.get(`${url}`, (response) => {
        response.on("data", (data) => {
            const ourJokes = JSON.parse(data)
            var randomJokes = ''
            randomJokes = ourJokes.joke
            res.render('index', {
                heading: "Home Page",
                date: thisDay,
                addTask: newTask,
                jokes: randomJokes
            })
        })
    })

})

app.post('/', (req, res) => {
    newTask.push(req.body.newTask)
    res.redirect('/')
})
app.listen(port, () => console.log(`Listening on port ${port}`))