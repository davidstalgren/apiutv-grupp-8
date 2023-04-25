var express = require('express');
var router = express.Router();
const connection = require('../conn');
const mysql = require('mysql2');


router.post('/', (req, res) => {
  let newName = req.body.newName;
  connection.connect(function (err) {
    if (err) {
        console.log(err);
        res.sendStatus(500);
        return
    }
    let sql = `SELECT userName, userId FROM users WHERE userName = ${mysql.escape(newName)}`         
    connection.query(sql, function(err, result) {
      if (err) {
        console.log(err)
        res.sendStatus(404)
        return
      }
      if (result.length == 0) {
        saveUser(req, res);
      } else {
        console.log(result)
        if (result[0].userId == req.body.userId) {
          res.json({userName:result[0].userName, userId:result[0].userId});
          return
        }
        res.sendStatus(404)
      }
    })
  })
}) 


function saveUser (req, res) {
    let userName = req.body.newName;
        let sql = `INSERT INTO users (userName) VALUES (${mysql.escape(userName)})`;
        connection.query(sql, function(err, result) {
        if (err) {
            console.log(err)
            res.sendStatus(500);
            return
          }
          res.json({userName:userName, userId:result.insertId});
      })
  };

  module.exports = router;