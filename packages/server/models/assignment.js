import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
    }, { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema)

export default Assignment