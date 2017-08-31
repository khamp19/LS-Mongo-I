const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Users = require('./users');
mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const app = express();
app.use(bodyParser.json());

// post new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = new Users(req.body);
  if (!name || !email) {
    res.status(422).json({ error: 'include name and email'});
    return;
  };
  newUser.save((err, newUser) => {
    if(err) res.status(500).json({ error: 'could not save user'});
    res.status(200).json(newUser);
  })
})

// get all users
app.get('/users', (req, res) => {
  Users.find({}, (err, Users) => {
    if(err) res.status(500).json({ err: 'cannot get users'});
    res.json(Users);
  });
});

// get user by id
app.get('/users/:id', (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if(err) res.status(404).json({ error: 'user not found'});
    res.status(200).json(user);
  });
});

// delete user by id
app.delete('/users/:id', (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err) => {
    if(err) res.status(404).json({ error: 'user not found'});
    res.status(200).json({ success: true, message: 'user was deleted'})
  });
});

app.listen(8080, () => {
  console.log('server listening on port 8080');
});
