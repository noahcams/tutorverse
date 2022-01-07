import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	username: {
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
	classIds: [{
		type: ObjectId,
		ref: 'Class',
	}],
	grades: [
		{
			grade: {
				type: Number,
			},
			assignment: {
				type: ObjectId,
				ref: 'Assignment',
			}
		},
	],

	type: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('User', userSchema);

export default User;
