import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const classSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        unique: true,
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
    ],
    assignments : [
        {
            type: ObjectId,
            ref:'Assignment',
        }
    ]
});

const Class = mongoose.model('Class', classSchema)

export default Class