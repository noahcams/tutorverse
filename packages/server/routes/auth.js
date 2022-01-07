import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

const router = express.Router();

// Updating password
router.route('/:id/:oldPassword').get(async (request, response) => {
	const { id, oldPassword } = request.params;
	const user = await User.findOne({ _id: id });
  try {
	  response.json(await bcrypt.compare(oldPassword, user.passwordHash));
  } catch (err) {
    response.status(500).send('Incorrect current password');
  }
});

router.get('/', (req, res, next) => {
	res.send('auth endpoint');
});

router.post('/signup', async (req, res) => {
	const { username, email, password, type, grades, classIds, firstName, lastName } = req.body;

	if (!password || !username || !email) {
		return res.status(422).json({ error: 'Please fill out all fields and make sure they are correct' });
	} 

	User.findOne({ username: username })
		.then((savedUser) => {
			if (savedUser) {
				return res
					.status(422)
					.json({ error: 'user already exists with that name' });
			}
			bcrypt.hash(password, 12).then((hashedpassword) => {
				const user = new User({
					username,
					email,
					passwordHash: hashedpassword,
					type,
					grades,
					classIds,
					firstName,
					lastName
				});

				user
					.save()
					.then(() => {
						res.json({ message: 'saved successfully' });
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post('/signin', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(422).json({ error: 'missing username or password' });
	}

	const user = await User.findOne({ username: username });
	const passwordCorrect =
		user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: 'invalid username or password',
		});
	}

	// const userForToken = {
	// 	username: user.username,
	// 	id: user._id,
	// };

	// const token = jwt.sign(userForToken, keys.jwt.secret);
	res
		.status(200)
		.send(user);
});

export default router;