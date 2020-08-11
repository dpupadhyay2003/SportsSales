const path = require('path')
const express = require('express')
var bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();

// for parsing application/json
app.use(bodyParser.json());
app.use(express.json());

const port = 3000;

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))

// In Order to Removing CORS Policy Error
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var con = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'deep',
    password: 'admin',
    database: 'sportssales'
});

app.get('/getUserById', (req, res) => {
    con.query("SELECT * FROM `sportssales`.`register` where id=" + req.query.id, function(err, result) {
        if (err) {
            console.log("Error query running query");
            console.log(err);
            res.status(500).send("Error with DB");
        } else {
            console.log("Select query Run - No Issue");
            var resultRes = JSON.stringify(result);

            console.log("Select query Resul - >" + resultRes);
            res.status(200).send(resultRes);
        }
    });
});


app.get('/login', (req, res) => {
    con.query("SELECT * FROM `sportssales`.`register`", function(err, result) {
        if (err) {
            console.log("Error query running query");
            console.log(err);
            res.status(500).send("Error with DB");
        } else {
            console.log("Select query Run - No Issue");
            var resultRes = JSON.stringify(result);

            console.log("Select query Resul - >" + resultRes);
            res.status(200).send(resultRes);
        }
    });
});

app.post("/UpdateRegister", function(req, res) {
    console.log("ID: ", req.body.id);
    console.log("Name: ", req.body.name);
    console.log("Email: ", req.body.email);
    console.log("Phone Number: ", req.body.phoneNumber);
    console.log("Age: ", req.body.age);
    console.log("Password: ", req.body.password);
    if (req.body.id && req.body.name && req.body.email && req.body.phoneNumber && req.body.age && req.body.password) {
        // Update
        var query = '';
        query += 'UPDATE `sportssales`.`register` SET';
        query += ' name = "' + req.body.name + '", email = "' + req.body.email + '",';
        query += ' password = ' + req.body.password + ', phoneNumber = "' + req.body.phoneNumber + '",';
        query += ' age = ' + req.body.age + '';
        query += ' WHERE id=' + req.body.id + ';';

        con.query(query, function(err, result) {
            if (err) {
                console.log("Error query running query");
                console.log(err);
                res.status(500).send("Error with DB");
            } else {
                console.log("Data Updated.");
                res.status(200);
            }
        });
    } else {
        console.log("INVALID PARAMETER");
    }
    return res.send("Success");
});

app.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var pwd = req.body.password;
    var phone = req.body.phoneNumber;
    var age = req.body.age;
    console.log(req.body);
    if (name && email && pwd && phone & age) {
        // Insert 
        var query = '';
        query += 'INSERT into `sportssales`.`register`(name, email, password, phoneNumber, age, status, admin) '
        query += 'values ("' + name + '", "' + email + '", "' + pwd + '", ' + phone + ', ' + age + ', true, false);';
        con.query(query, function(err, result) {
            if (err) {
                console.log("Error query running query");
                console.log(err);
                res.status(500).send("Error with DB");
            } else {
                console.log("Data Inserted.");
                res.status(200).send("Record Added.");
            }
        });
    } else {
        console.log(req.body);
        res.send(req);
    }
});

const router = require('./adminNodeFile.js');
app.use(router);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))