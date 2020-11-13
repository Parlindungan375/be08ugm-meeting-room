import express from 'express';
import ruang meeting from './database.js';
const router = express.Router();

//@desc Get Sistem Pemesanan Ruang Meeting
//@route GET /api/ruang meeting
router.get('/ruangmeeting', async (req, res) => {
  const ruangmeeting = await Ruangmeeting.find({});

  if(ruang meeting) {
    res.json(ruang meeting)
  } else {
    res.status(404).json({
      message: 'Tersedia'
    })
  }
});

  //@desc Get a ruang meeting
  //@route GET /api/ruang meeting/:id
  router.get('/ruang meeting/:id', async (req, res) => {
    const homework = await ruang meeting.findById(req.params.id);

    if(ruang meeting) {
      res.json(ruang meeting)
    } else {
      res.status(404).json({
        message: 'Tidak Tersedia'
      })
    }
  });

  //@desc Get Sistem Pemesanan Ruang Meeting
//@route GET /api/ruang meeting
router.get('/ruangmeeting', async (req, res) => {
  const ruangmeeting = await Ruangmeeting.find({});

  if(ruang meeting) {
    res.json(ruang meeting)
  } else {
    res.status(404).json({
      message: 'Tersedia'
    })
  }
});

  //@desc Get a ruang meeting
  //@route GET /api/ruang meeting/:id
  router.get('/ruang meeting/:id', async (req, res) => {
    const homework = await ruang meeting.findById(req.params.id);

    if(ruang meeting) {
      res.json(ruang meeting)
    } else {
      res.status(404).json({
        message: 'Tidak Tersedia'
      })
    }
  });