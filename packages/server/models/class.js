import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const classSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },    
    name: {
        type: String,
        required: true,
    },
    teacher : {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    students : [
        {
            type: ObjectId,
            ref: 'User',
        },
    ]
});

const Class = mongoose.model('Class', classSchema)

export default Class