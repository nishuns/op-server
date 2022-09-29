require('dotenv').config;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Models = require('../../models/models');
const { User } = Models;

/**
 *  @description for home
 *  @method GET /
 */
exports.home = (req, res) => {
  res.send({
    app_name: process.env.APP_NAME,
  })
}

/**
 *  @description for login
 *  @method POST /userlogin
 */
 exports.userlogin = (req, res) => {
    User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
                return res.status(404).json({error:'Invalid email and password!'})
            }
            bcrypt.compare(req.body.password,user.password)
                .then(valid=>{
                    if(valid){
                        const token=jwt.sign({_id:user._id},process.env.SECRET)
                        const {_id, fname, lname, username, email }=user
                        return res.json({stat: 'success',token,user:{_id, fname, lname, username, email}})
                    }else{
                        return res.json({stat: 'failure',error:'Invalid Email and Password'})
                    }
                })
                .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
  }
  
  exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.json({
        message:"User signout successfully"
    })
  }
  