const express = require('express');
const router = express.Router()
const Joi = require('joi')
const passport = require('passport')
const bcrypt = require ('bcryptjs')
 
const User = require('../models/user')
const Post = require('../models/post')
 
 
//validation schema
 
const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
})

const postSchema = Joi.object().keys({
  content: Joi.string().required()
})
 
router.route('/register')
  .get((req, res) => {
    res.render('register')
  })
  .post(async (req, res, next) => {
    try {
      const result = Joi.validate(req.body, userSchema)
      if (result.error) {
        req.flash('error', 'Data entered is not valid. Please try again.')
        res.redirect('/users/register')
        return
      }
 
      const user = await User.findOne({ 'email': result.value.email })
      if (user) {
        req.flash('error', 'Email is already in use.')
        res.redirect('/users/register')
        return
      }
 
      //const hash = await User.hashPassword(result.value.password)
 
      //delete result.value.confirmationPassword
      //result.value.password = hash
      result.value.password = bcrypt.hashSync(result.value.password, 10);
 
      const newUser = await new User(result.value)
      await newUser.save()
 
      req.flash('success', 'Registration successfully, go ahead and login.')
      res.redirect('/users/login')
 
    } catch(error) {
      next(error)
    }
  })
 
  router.route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post(async(req, res) =>{
    const result = Joi.validate(req.body, userSchema)
    ses = req.session
    const user = await User.findOne({'email': result.value.email})
          if(user){
            //const hash = await User.hashPassword(result.value.password)
            //elete result.value.confirmationPassword
            //result.value.password = hash
            if(!bcrypt.compareSync(result.value.password, user.password)) {
              return false
    }
    ses.user = user
    //res.send("ois"+user.username)
    res.redirect('/users/dashboard') 
  }
    return false
});
router.route('/dashboard')
  .get((req, res) => {
    res.render('dashboard')
    
  })
  .post(async(req,res) =>{
    session = req.session
    const result = Joi.validate(req.body, postSchema)
    result.value.username = req.session.user.username
    const newTweet = await new Post(result.value)
      await newTweet.save()
      res.redirect('/users/show')
  })
     //const user= await Post.findOne({'username': result.value.username })
     


  router.route('/show')
    .get((req, res) => {
          res.render('show')
    
  })
  .post(async(req,res) =>{
    session = req.session
    Post.find({ 'username': req.session.user.username }, 'username content', function (err, post) {
      if (err) return handleError(err);
      res.send(post)
    }).limit(10);
  })
  module.exports = router
