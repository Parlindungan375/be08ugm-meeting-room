import User from './../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import Conf from './../config.js';

const userRouter = express.Router();

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//add new user
userRouter.post('/add', (req, res) => {
try{
   var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
    User.create({
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword
    },
       function (err, user) {
          if (err) return res.status(500).send("There was a problem registering the user.")
          // create a token
          var token = jwt.sign({ id: user._id }, Conf.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
       }); 
  }
    catch(error){
        res.status(500).json({ error: error})
  }
})

  //@route GET /api/user/datauser
userRouter.get('/datauser', async (req, res) => {
  const user = await User.find({});

  if(user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: 'User not found'
    })
  }
});

//@route GET /api/user/datauser/:id
userRouter.get('/datauser/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if(user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: 'User not found'
    })
  }
});

//@route PUT /api/user/datauser/:id
userRouter.put('/datauser/:id', async (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const {username, email, password} = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    const updateDatauser = await user.save();
    res.json(updateDatauser)
  } else {
    res.status(404).json({
      message: 'User not found'
    })
  }
});

//@route DELETE /api/user/datauser/:id
userRouter.delete('/datauser/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if(user) {
    await user.remove();
    res.json({
      message: 'Data removed'
    })
  } else {
    res.status(404).json({
      message: 'User not found'
    })
  }
});

export default userRouter;

