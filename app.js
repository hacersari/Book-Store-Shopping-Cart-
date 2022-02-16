/**
 * Hacer Aynur Sari
 * Date: 11/19/21
 * Section: CSE 154 AA
 *
 * This is CP4, this is the node.js - server side of the website, it handles
 * the API and the changed that client made.
 */

'use strict';
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT_NUMBER = 8000;

app.use(cors());
app.use(express.json()); // built-in middleware
app.use(express.static('public'));

// BOOKS ENDPOINT
app.get('/books', (req, res) => {
  fs.readFile('bookapi.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let resultData = [];
    data = data.split("\n");
    data.forEach(book => {
      let bookObj = {};
      let splitBook = book.split(":");
      bookObj.title = splitBook[0].trim();
      bookObj.author = splitBook[1].trim();
      bookObj.isbn = splitBook[2].trim();
      resultData.push(bookObj);
    });
    let jsonString = JSON.stringify(resultData);
    res.type('json');
    res.setHeader('Content-Type', 'application/json');
    res.send(jsonString);
  });

});

// shopping cart endpoint
app.get('/shoppingcart', (req, res) => {
  fs.readFile('shoppingcart.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.type("text");
    res.send(data);
  });

});

// shopping cart endpoint for post
app.post('/shoppingcart', (req, res) => {
  fs.appendFile('shoppingcart.txt', req.body.isbn + '\n', function(err) {
    if (err) {
      throw err;
    }
  });
  res.setHeader('Content-Type', 'application/json');
  res.type("json");
  res.send(req.body);
});

const PORT = process.env.PORT || PORT_NUMBER;
app.listen(PORT);