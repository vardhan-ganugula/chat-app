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
    },
    expiryDate: {
        type: Date,
        default: Date.now() + (300 * 1000)
    }
}, {timestamps: true})

messageSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });


export default model('Message', messageSchema)