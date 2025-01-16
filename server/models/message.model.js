import {Schema, model} from 'mongoose'


const messageSchema = new Schema({
    senderId : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiverId : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message : {
        type: String,
    },
    image: {
        type: String
    }
}, {timestamps: true})

export default model('Message', messageSchema)