var express = require('express');
var router = express.Router();
const connection = require('../conn');
const mysql = require('mysql2');

router.post('/save', (req, res) => {
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

router.post('/load', (req, res) => {
  const loadDrawing = req.body.id;
  console.log('loadDrawing', loadDrawing);

  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {

      let sql = `SELECT * FROM presetpaintings WHERE id = (?)`;
      
      connection.query(sql, loadDrawing, (err, data) => {
        if (err) {
          console.log(err);
        } else {

          data.map(presetPainting => {
            console.log(Buffer.from(presetPainting.gridLayout).toString());
            res.send(Buffer.from(presetPainting.gridLayout).toString());
          })
        }
      })
    }
  })
})

  module.exports = router;