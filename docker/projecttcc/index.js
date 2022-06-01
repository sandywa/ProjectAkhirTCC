const bodyParser =require('body-parser')
const express = require('express')
const cors = require('cors')
const {db} = require('./model/dbConection')
const app = express()
const port = 3030

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.get('/api/read', function(req, res){
    const sqlQuery = "SELECT * FROM note"
    db.query(sqlQuery, (err, result)=> {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result)
        }
    })
    // const data = {
    //     name : 'lal',
    //     age : 21
    // }
    // res.send(JSON.stringify(data))
})
app.post('/api/create', function(req,res){
    const judul = req.body.judul;
    const text = req.body.text;

    const sqlQuery = `INSERT INTO note (judul,text) VALUE('${judul}','${text}')`
    db.query(sqlQuery, (err, result)=> {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result)
        }
    })
})
app.put('/api/update', function(req,res){
    const id = req.body.id;
    const judul = req.body.judul;
    const text = req.body.text;

    const sqlQuery = `UPDATE note SET judul='${judul}', text='${text}' WHERE id='${id}'`
    db.query(sqlQuery, (err, result)=> {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result)
        }
    })
})
app.delete('/api/delete', function(req,res){
    const id = req.body.id;    

    const sqlQuery = `DELETE FROM note WHERE id='${id}'`
    db.query(sqlQuery, (err, result)=> {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result)
        }
    })
})
app.post('/api/getId', function(req,res){
    const id = req.body.id;    

    const sqlQuery = `SELECT * FROM note WHERE id='${id}'`
    db.query(sqlQuery, (err, result)=> {
        if(err){
            console.log(err)
        }else{
            res.send(JSON.stringify(result))
            console.log(JSON.stringify(result), 'ini result')
        }
    })
})



app.post('/task', function(req, res){
    res.send('Berhasil post sebuah task')
})

app.listen(port, function(){
    console.log(`Berhasil berjalan di port : ${port}`)
})

