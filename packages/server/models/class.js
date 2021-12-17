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
        type: String,
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