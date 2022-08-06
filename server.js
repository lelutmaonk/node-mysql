const express = require('express')
const mysql = require('mysql')
const BodyParser = require('body-parser')

const app = express()

app.use(BodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', 'views')


// initialitation database
const db = mysql.createConnection({
    host : "localhost",
    database : "db_nodejs",
    user : "root",
    passowrd : ""
})


db.connect((err)=>{
    if(err) throw err
    console.log('database connected...')

    app.get('/', (req, res)=>{
        const query_sql = "SELECT * FROM students"
        db.query(query_sql, (err, result) => {
            const students = JSON.parse(JSON.stringify(result))
            res.render('index', {students : students, title : 'List Students'})  
        })
    })

    app.post("/create", (req, res)=>{
        const insertSQL = `INSERT INTO students (name, nim, address) VALUES ('${req.body.name}', '${req.body.nim}', '${req.body.address}');`
        db.query(insertSQL, (err, result) => {
            if(err) throw err
            res.redirect('/')
        })
    })

})

app.listen(8000, () => {
    console.log('server ready...')
})



