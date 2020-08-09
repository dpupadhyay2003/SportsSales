var mysql = require('mysql');
const express = require('express');

var con = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'deep',
    password: 'admin',
    database: 'sportssales'
});