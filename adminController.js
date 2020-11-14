import admin from './../models/admin.js';
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

import Conf from './../config.js';

const adminRouter = express.Router();

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//add new admin
adminRouter.post('/add', (req, res) => {
try{
   var hashedPassword = bcrypt.hashSync(req.body.password, 10);
  
    admin.create({
        username : admin,
        password : hashedPassword
    },
       function (err, admin) {
          if (err) return res.status(500).send("There was a problem registering the user.")
          // create a token
          var token = jwt.sign({ id: admin._id }, Conf.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
       }); 
  }
    catch(error){
        res.status(500).json({ error: error})
  }
})

  //@route GET /api/admin/dataadmin
adminRouter.get('/dataadmin', async (req, res) => {
  const admin = await admin.find({});

  if(admin) {
    res.json(admin)
  } else {
    res.status(404).json({
      message: 'Admin not found'
    })
  }
});

//@route GET /api/admin/dataadmin/:id
adminRouter.get('/dataadmin/:id', async (req, res) => {
  const admin = await admin.findById(req.params.id);

  if(admin) {
    res.json(admin)
  } else {
    res.status(404).json({
      message: 'Admin not found'
    })
  }
});

//@route PUT /api/admin/dataadmin/:id
adminRouter.put('/dataadmin/:id', async (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const {username, password} = req.body;

  const admin = await admin.findById(req.params.id);

  if (admin) {
    admin.username = username;
    admin.password = hashedPassword;

    const updateDataadmin = await admin.save();
    res.json(updateDataadmin)
  } else {
    res.status(404).json({
      message: 'Admin not found'
    })
  }
});

//@route DELETE /api/admin/dataadmin/:id
adminRouter.delete('/dataadmin/:id', async (req, res) => {
  const admin = await admin.findById(req.params.id);

  if(admin) {
    await admin.remove();
    res.json({
      message: 'Data removed'
    })
  } else {
    res.status(404).json({
      message: 'Admin not found'
    })
  }
});

export default adminRouter;