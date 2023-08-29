const messageModel = require('../Models/messageModel')

const sendMessage = async (req,res) =>{
    try{
        const {room_id,sender_id,message_text} = req.body;
        
        if(!room_id || !sender_id || !message_text) return res.status(400).json('fields must be required')
        const message =  new messageModel({room_id,sender_id,message_text})
        await message.save();
        res.status(200).json(message)
    }catch(error){
        res.status(500).json(error)
        console.log(error);
    }
}



const getMessage = async (req, res) => {
  try {
    const { room_id } = req.params;
    const messages = await messageModel.find({ room_id: room_id });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {sendMessage,getMessage}