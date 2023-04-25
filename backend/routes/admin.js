var express = require('express');
var router = express.Router();
const connection = require('../conn');
const mysql = require('mysql2');

router.post('/', (req, res) => {
  const newDrawing = JSON.stringify(req.body);
  console.log('newDrawing', newDrawing);

  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {

      let sql = `INSERT INTO presetpaintings 
        (gridLayout) 
        VALUES (?)`;
      
      console.log(newDrawing);

      connection.query(sql, [newDrawing], (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('saved new Drawing', data);
          res.json(data);
        }
      })
    }
  })
})

  module.exports = router;