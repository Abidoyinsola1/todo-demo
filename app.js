const express = require('express')
const bodyParser = require('body-parser')
const https = require('https');
const mongoose = require('mongoose')

const app = express()
const port = 4000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });

const todoListSchema = mongoose.Schema({
    task: {
        type: String,
        required: [true, "Please add a valid task"]
    },
    category: {
        type: String,
        required: [true, "Please add a valid category"]
    }
})

const todoList = mongoose.model('todo', todoListSchema)

addListDB = (taskType, categoryList) => {
    const list = todoList({
        task: taskType,
        category: categoryList
    })
    list.save()
}


app.get('/', (req, res) => {

    const url = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous?blacklistFlags=nsfw,racist,sexist&type=single'
    https.get(`${url}`, (response) => {
        response.on("data", (data) => {
            const ourJokes = JSON.parse(data)
            var randomJokes = ''
            randomJokes = ourJokes.joke
            res.render('personal', {
                heading: "Personal",
                jokes: randomJokes
            })
        })
    })

})

app.post('/', (req, res) => {
    const personalTask = req.body.newTask
    const categoryType = 'personal'

    if (personalTask == '') {
        console.log('Add a valid task')
    } else {
        addListDB(personalTask, categoryType)
    }

    res.redirect('/')
})

app.get('/work', (req, res) => {
    res.render('work', {
        heading: 'Work Tasks',
        jokes: ''
    })
})

app.post('/work', (req, res) => {
    const workTask = req.body.workTask
    const categoryType = 'work'

    if (workTask == '') {
        console.log('Add a valid task')
    } else {
        addListDB(workTask, categoryType)
    }

    res.redirect('/work')
})


app.listen(port, () => console.log(`Listening on port ${port}`))