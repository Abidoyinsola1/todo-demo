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

    todoList.find({ category: "personal" }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.render('personal', {
                heading: "Personal",
                documents: docs
            })
        }
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

    todoList.find({ category: "work" }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.render('work', {
                heading: 'Work Tasks',
                documents: docs
            })
        }
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

app.get('/family', (req, res) => {
    todoList.find({ category: "family" }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.render('family', {
                heading: 'Family Tasks',
                documents: docs
            })
        }
    })
})

app.post('/family', (req, res) => {
    const familyTask = req.body.familyTask
    const categoryType = 'family'

    if (familyTask == '') {
        console.log('Add a valid task')
    } else {
        addListDB(familyTask, categoryType)
    }

    res.redirect('/family')
})

app.listen(port, () => console.log(`Listening on port ${port}`))