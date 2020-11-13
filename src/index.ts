import express from 'express'

import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
import { mongo } from 'mongoose'

import {Transaction, TransactionType} from './mongoose'
import { Room, RoomType } from './room'

const app = express()

const transactionModel = new Transaction()
const roomModel = new Room()

// Transaction

  // create transaction
  app.post('/trans', async function(req,res,next) {
    try {
      await transactionModel.create(req.body)
    } catch (error){
      return next(error)
    }
    res.send({ success: true })
  })
  
  // get all transaction
  app.get('/trans', async function(req,res,next) {
    let transc: TransactionType[]
    try{
      transc = await transactionModel.getAll()
    } catch (error){
      return next(error)
    }
    return res.send(transc)
  })

  // get transaction by id
  app.get('/trans/:id', async function(req,res,next) {
    let transc: TransactionType | null
    try{
      transc = await transactionModel.getByID(req.params.id)
    }catch(error){
      return next(error)
    }
    return res.send(transc)
  })

  // update transaction by id
  app.put('/trans/:id', async function(req, res, next) {
    try {
      await transactionModel.update(req.params.id, req.body)
      res.send({ success: true })
    }catch(error){
      return next(error)
    }

  })

  // delete transaction
  app.delete('/trans/:id', async function(req,res,next) {
    try{
      await transactionModel.delete(req.params.id)
    }catch(error){
      return next(error)
    }

    res.send({success: true})
  })

//Room
app.post('/room', async function(req, res, next) {
  try{
    await roomModel.create(req.body)
  }catch (error){
    return next(error)
  }

  res.send({success :true})
})

app.get('/room', async function(req, res, next) {
  let rooms : RoomType[]
  try {
    rooms = await roomModel.getAll()
  } catch (error){
    return next(error)
  }

  return res.send(rooms)
})

app.get('/room/:id', async function(req, res, next) {
  let room: RoomType | null
  try{
    room = await roomModel.getByID(req.params.id)
  } catch (error){
    return next(error)
  }

  return res.send(room)
})

app.put('/room', async function(req, res, next) {
  try{
    await roomModel.update(req.params.id, req.body)
  } catch (error){
    return next(error)
  }

  res.send({success :true})
})

app.delete('/room', async function(req, res, next) {
  try{
    await roomModel.delete(req.params.id)
  } catch (error){
    return next(error)
  }

  res.send({success : true})
})