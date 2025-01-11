const chatModel = require("../Models/chatModel");

//createChat
//getUserChats
//findChat

const createChat = async(req, res) => {
    const {firstID, secondID} = req.body;

    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstID, secondID]}
        });

        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstID,secondID]
        });

        const response = await newChat.save();

        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findUserChats = async(req, res) => {
    const userID = req.params.userID;

    try{
        const chats = await chatModel.find({
            members: {$in: [userID]}
        });
        res.status(200).json(chats);

    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findChat = async(req, res) => {
    const {firstID, secondID} = req.params;

    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstID, secondID]}
        });
        res.status(200).json(chat);

    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {createChat, findUserChats, findChat};