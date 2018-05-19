const express = require('express');
const app = express();

const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
 console.log('mongo connection done');
})

const User = mongoose.model('user', new mongoose.Schema({
 user: {type: String, require: true},
 age: {type: Number, require: true}
}))

// User.create({
//  user: 'imooc',
//  age: 18
// }, function(err, doc){
//  if(!err) {
//   console.log(doc);
//  } else {
//   console.log(err);
//  }
// })

// User.create({
//  user: 'imooc',
//  age: 12
// }, function(err, doc){
//  if(!err) {
//   console.log(doc);
//  } else {
//   console.log(err);
//  }
// })

// User.create({
//  user: 'imooc',
//  age: 10
// }, function(err, doc){
//  if(!err) {
//   console.log(doc);
//  } else {
//   console.log(err);
//  }
// })

// User.remove({age: 18}, function(err, doc) {
//  console.log(doc);
// });

User.update({'user': 'imooc', 'age': 10}, {'$set':{age: 101}}, function(err, doc){
 console.log(doc);
})

app.get('/', function(req, res){
 res.send('<h1>Hello World</h1>');
})

app.get('/data', function(req, res){
 User.find({user: 'imooc'}, function(err, doc) {
  console.log(doc);
  res.json(doc);
 })
 // res.json({name: 'imooc', course: 'react'});
})

app.post('/date', function(req, res) {
 res.json(Date.now());
})

app.listen(9093, function(){
 console.log('Node app start at port 9093');
})
