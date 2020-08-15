const express = require('express');
const multer = require('multer');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'deep',
    password: 'admin',
    database: 'sportssales'
});

const router = express.Router();

var file_name = "";
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "../IMG");
    },
    filename: function(req, file, callback) {
        file_name = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, file_name);
    }
});

var upload = multer({
    storage: Storage
}).single('files');

router.post("/admin/AddItem", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.send(err);
        }
        if (req.body.itemName && req.body.itemType && req.body.itemPrice && req.body.itemQty && req.body.itemDescription) {
            // Insert
            var query = '';
            query += 'INSERT into `sportssales`.`additem`(name, type, price, imageurl, quantity, description) '
            query += "values ('" + req.body.itemName + "', '" + req.body.itemType + "', " + req.body.itemPrice + ", '" + file_name + "', " + req.body.itemQty + ", '" + req.body.itemDescription + "');";

            con.query(query, function(err, result) {
                if (err) {
                    console.log("Error query running query");
                    console.log(err);
                    res.status(500).send("Error with DB");
                } else {
                    console.log("Data Inserted.");
                    res.status(200);
                }
            });
        } else {
            console.log("INVALID PARAMETER");
        }
        return res.send("Success");
    });
});


router.post("/admin/UpdateItem", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.send(err);
        }
        if (req.body.id && req.body.itemName && req.body.itemType && req.body.itemPrice && req.body.itemQty && req.body.itemDescription) {
            // Update
            var query = '';
            query += 'UPDATE `sportssales`.`additem` SET';
            query += ' name = "' + req.body.itemName + '", type = "' + req.body.itemType + '",';
            query += ' price = ' + req.body.itemPrice + ', imageurl = "' + file_name + '",';
            query += ' quantity = ' + req.body.itemQty + ', description = "' + req.body.itemDescription + '"';
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
});



router.get("/admin/getItem", function(req, res) {
    con.query("SELECT * FROM `sportssales`.`additem`", function(err, result) {
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


router.get("/admin/getItemById", function(req, res) {
    con.query("SELECT * FROM `sportssales`.`additem` where id=" + req.query.id, function(err, result) {
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

router.get("/admin/deleteById", function(req, res) {
    con.query("DELETE FROM `sportssales`.`additem` WHERE id=" + req.query.id, function(err, result) {
        if (err) {
            console.log("Error query running query");
            console.log(err);
            res.status(500).send("Error with DB");
        } else {
            console.log("Select query Run - No Issue");
            res.status(200).send("Success");
        }
    });
});


router.get("/admin/getUsers", function(req, res) {
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


module.exports = router