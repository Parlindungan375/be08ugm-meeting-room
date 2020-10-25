import mongoose, { Schema } from 'mongoose'

const  ObjectId = Schema.Types.ObjectId;

export type TransactionType = {
    user_id : Schema.Types.ObjectId
    reservation_date: Date
    update_date: Date
    description: string
    details : {
        room_id : Schema.Types.ObjectId
        room_type: string
        capacity: number
        check_in_date: Date
        amount: number
    }
}

export type TransactionDocument = mongoose.Document & TransactionType


const TransactionSchema = new Schema({
    user_id : ObjectId,
    reservation_date: Date,
    update_date: Date,
    description: String,
    details : {
        room_id : ObjectId,
        room_type: String,
        capacity: Number,
        check_in_date: Date,
        amount: Number
    }
})

export class Transaction {
    private model: mongoose.Model<TransactionDocument>

    constructor() {
        this.model = mongoose.model('transaction', TransactionSchema)
    }

    // get transaction
  async create(data: TransactionType){
    try{
      const result = await this.model.create(data)
    } catch(error){
      throw error
    }
  }

  // get all transaction
  async getAll(){
    let transc: TransactionType[]

    try {
      transc = await this.model.find({})
    } catch(error){
      throw error
    }

    return transc
  }

  // get transaction by id
  async getByID(transcID: string){
    let transc: TransactionType | null
    try{
      transc = await this.model.findById(transcID)
    }catch(error){
      throw error
    }

    return transc
  }

  // update transaction
  async update(transcID: string, data: Partial<TransactionDocument>){
    try{
      data.update_date = new Date //save date update
      await this.model.findByIdAndUpdate(transcID, { $set: data })
    }catch(error){
      throw error
    }
  }

  // delete transaction
  async delete(transcID: string){
   
    try{
      await this.model.findByIdAndDelete(transcID)
    }catch(error){
      throw error
    }
  }
}