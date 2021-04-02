const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ejs = require('ejs');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
require('dotenv').config();
let db, dbName='todov2';

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

MongoClient.connect(process.env.DB_STRING, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    });

app.get('/', (req, res) => {
    db.collection('tasks').find().toArray()
    .then(data => {
        res.render('index.ejs', {info: data});
    })
    .catch(err => {
        console.log(err);
    })
});

app.put('/modify', (req, res) => {
    db.collection('tasks').updateOne({taskName: req.body.taskName, completed: req.body.completed},
        {$set: {completed: !req.body.completed}},
        {sort: {_id: -1}, upsert: true})
    .then(data => {
        res.json('Successfully updated');
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/addTask', urlencodedParser, (req, res) => {
    db.collection('tasks').insertOne({taskName: req.body.taskName, completed: false})
    .then(data => {
        console.log('Successfully inserted')
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    })
});

app.listen(process.env.PORT, (err) => {
    if(err) console.log(err);
    else console.log('Server is running at port ' + process.env.PORT);
});
