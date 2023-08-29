const roomModel = require('../Models/roomModel');

const createRoom = async (req,res) =>{
    try{
        const {name} = req.body
         
        let room = await roomModel.findOne({name})
    
        if(room) return res.status(400).json("room already exists")
    
        room = new roomModel({name}) 
    
        await room.save();
        return res.status(200).json(room)
        
    }catch(error){
        return res.status(500).json(error)
    }
}

const listRooms = async (req,res) =>{
    try{

        const rooms = await roomModel.find() 
        return res.status(200).json(rooms)
    }catch(error){
        return res.status(500).json(error)
    }
}

const findRoom = async (req,res) =>{
    try{
        const {id} = req.params
        const room = await roomModel.findById(id)
        if(!room) return res.status(400).json("room not found")
        return res.status(200).json(room)
    }catch(error){
        return res.status(500).json(error)
    }
}

module.exports = {createRoom , listRooms ,findRoom}