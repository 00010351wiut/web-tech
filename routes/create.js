const express = require('express')
const router = express.Router()

const fs = require('fs')

router.route('/')
.get((req, res) => {
    res.render('create')
})
.post((req, res) => {
    const name = req.body.name
    const date = req.body.date
    const experience = req.body.experience
    const about = req.body.about
    const hired = req.body.hired

    fs.readFile('./data/hired.json', (err, data) => {
        if (err) throw err

        const employees = JSON.parse(data)

        employees.push({
            id: id(),
            name: name,
            date: date,
            experience: experience,
            about: about,
            hired: hired,
        })

        fs.writeFile('./data/hired.json', JSON.stringify(employees), err => {
         if (err) throw err
        })
        res.redirect('/create?success=1')
    })
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

module.exports = router