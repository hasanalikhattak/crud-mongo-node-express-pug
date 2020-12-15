var express = require('express');
var mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

var router = express.Router();

const User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { error: false, title: "Home"});
});

router.get('/users', (req, res) => {
  User.find()
  .then((users) => {
    res.render('users', { title: 'Listing registrations', users});
  })
  .catch(() => { res.send('Sorry! Something went wrong, Try Refreshing.'); });
});

router.post('/',[
                  check('name')
                    .isLength({ min: 1 })
                    .withMessage('Please enter a name'),
                  check('cgpa')
                    .isLength({ min: 1 })
                    .withMessage('Please enter cgpa between 0.0 -- 4.0'),
                  check('course')
                    .isLength({ min: 1 })
                    .withMessage('Please enter a course'),
                  check('email')
                    .isLength({ min: 1 })
                    .withMessage('Please enter an email'),
                  check('password')
                    .isLength({ min: 1 })
                    .withMessage('Please enter a password'),
                ], (req, res) => {
                  if(req.body._id == ''){
                    insertUser(req, res);
                  } else {
                    updateUser(req, res);
                  }
                }
            );

function updateUser(req, res){
  const errors = validationResult(req);
  if(errors.isEmpty()){
    User.findOneAndUpdate({_id: req.body._id}, {$set:req.body}, {new: true}, (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
    
      res.redirect('/users');
    });
  }
}

function insertUser(req, res){
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user = new User();
    user.name = req.body.name;
    user.cgpa = req.body.cgpa;
    user.email = req.body.email;
    user.course = req.body.course;
    user.password = req.body.password;
    user.save()
      .then(() => {
        // res.send('Thank you for User registration!');
        res.redirect('/users');
      })
      .catch((err) => { 
        console.log(err);
      });
  } else {
    res.render('index', {
      title: 'User Addition form',
      errors: errors.array(),
      data: req.body,
    });
  }
}

router.get('/user/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(!err){
      res.render('index', {title: 'Update User', data: user});
    }
  });
});

router.get('/user/delete/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err, doc) =>{
    if(!err){
      res.redirect('/users');
    } else{
      console.log('Error while deleting : ' + err);
    }
  });
});

module.exports = router;