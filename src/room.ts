import mongoose, { Schema } from 'mongoose'

const  ObjectId = Schema.Types.ObjectId;

export type RoomType = {
    roomID : Schema.Types.ObjectId
    roomName: string
    status: string
    price: number
};

export type RoomDocument = mongoose.Document & RoomType

//schema definition
const RoomSchema = new mongoose.Schema({

})

export class Room {
  private model: mongoose.Model<RoomDocument>

  constructor() {
    this.model = mongoose.model('room', RoomSchema)
  }

  async create(data : RoomType) {
    try{
      const result = await this.model.create(data)
      console.log('Insert result %j', result)
    } catch (error){
      throw error
    }

  }

  async getAll() {
    let rooms : RoomType[]
    try{
      rooms = await this.model.find({})
    }catch(error){
      throw error
    }
    return rooms
  }

  async getByID(roomID : string) {
    let room : RoomType | null
    try{
      room = await this.model.findById(roomID)
    }catch(error){
      throw error
    }

    return room
  }

  async update(roomID : string, updateData: Partial<RoomType>) {
    try{
       await this.model.findByIdAndUpdate(roomID, {$set: updateData})
    }catch (error){
      throw error;
    }
  }

  async delete(roomID : string) {
    try{
      await this.model.findByIdAndDelete(roomID)
   }catch (error){
     throw error;
   }
  }
}