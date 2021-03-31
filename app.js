const express = require('express')
const app = express()

const fs = require('fs')


app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
    const name = req.body.name
    const date = req.body.date
    const experience = req.body.experience
    const about = req.body.about

    fs.readFile('./data/hired.json', (err, data) => {
        if (err) throw err

        const employees = JSON.parse(data)

        employees.push({
            id: id(),
            name: name,
            date: date,
            experience: experience,
            about: about,
        })

        fs.writeFile('./data/hired.json', JSON.stringify(employees), err => {
         if (err) throw err
        })
        res.redirect('/create?success=1')
    })
})

app.get('/employees', (req, res) => {

    fs.readFile('./data/hired.json', (err, data) => {
        if (err) throw err
        
        const employees = JSON.parse(data)
        res.render('employees', {employees: employees})
    })
})

app.get('/employees/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/hired.json', (err, data) => {
        if (err) throw err
        
        const employees = JSON.parse(data)
        const employee = employees.filter(employee => employee.id == id)[0]
        res.render('employee', {employee: employee})
    })
})

app.get('/api/v1/employees', (req, res) => {
    fs.readFile('./data/hired.json', (err, data) => {
        if (err) throw err
        
        const employees = JSON.parse(data)
        res.json(employees)
    })
})

app.listen(3000,  err => {
    if(err) console.log(err)

    console.log('Server is running on port 3000...')
})


function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
};