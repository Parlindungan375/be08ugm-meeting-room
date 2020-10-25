import express from 'express'

import {Transaction, TransactionType} from './mongoose'

const app = express()

const transactionModel = new Transaction()

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