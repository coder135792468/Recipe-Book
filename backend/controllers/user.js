import asyncHandler from 'express-async-handler';
import generateToken from '../config/generateToken.js';
import User from '../models/User.js';

//@desc  Login User & get token
//@route POST /api/user/login
//@acess Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			bio: user.bio,
			avatar: user.avatar,
			token: generateToken(user._id),
		});
	} else {
		return res.status(401).json({
			message: 'Invalid email or password',
		});
	}
});

//@desc Register a new user
//@route POST /api/users/
//@acess Public
const registerUser = asyncHandler(async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (
			name.trim().length === 0 ||
			email.trim().length === 0 ||
			password.trim().length === 0
		) {
			return res.status(401).json({
				message: 'All fields are required',
			});
		}
		const existsUser = await User.findOne({ email });
		if (existsUser) {
			return res.status(400).json({
				message: 'User already registered',
			});
		}
		const user = await User.create({
			name,
			email,
			password,
		});
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				bio: user.bio,
				token: generateToken(user._id),
			});
		} else {
			return res.status(400).json({ message: 'Invalid user data' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Get all users
//@routes GET /api/users
//@acess Private
const getUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Delete user
//@route DELETE /api/users/:id
//@acess Private/admin
const deleteUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			await user.remove();
			res.json({
				message: 'User removed',
			});
		} else {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc GET user profile
//@route GET /api/user/profile
//acess Private
const getUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				bio: user.bio,
				isAdmin: user.isAdmin,
			});
		} else {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc UPDATE user profile
//@route PUT /api/user/profile
//@acess Private
const updateUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (user) {
			user.bio = req.body.bio || user.bio;
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			if (req.body.password) {
				user.password = req.body.password;
			}
			const updatedUser = await user.save();
			res.json({
				_id: updatedUser._id,
				name: user.name,
				email: updatedUser.email,
				bio: updatedUser.bio,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser._id),
			});
		} else {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Get user by ID
//@route GET /api/user/:id
//acess Private Admin
const getUserById = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');

		if (user) {
			res.json(user);
		} else {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Update user
//@route PUT /api/user/:id
//acess Private Admin,
const updateUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			user.isAdmin = req.body.isAdmin;
			const updated = await user.save();
			res.json({
				_id: updated._id,
				email: updated._email,
				isAdmin: updated.isAdmin,
				name: updated.name,
				bio: updated.bio,
			});
		} else {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

export {
	loginUser,
	registerUser,
	getUsers,
	deleteUser,
	getUserProfile,
	updateUserProfile,
	updateUser,
	getUserById,
};
