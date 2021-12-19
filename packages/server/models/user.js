import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
    },
    
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },    
    passwordHash: {
        type: String,
        required: true,
    },
    classId: {
        type: Number,
        required: true,
    },    
    grades: [
        {
            grade: {
                type: Number,
                required: true,
            }
        }
    ],    
    type: {
        type: String,
        required: true,
        default: null,
    },
});

const User = mongoose.model('User', userSchema)

export default User