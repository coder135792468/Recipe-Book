import asyncHandler from 'express-async-handler';
import Receipe from '../models/Receipe.js';
import checkID from '../middlewares/validateID.js';
//@desc GET all receipes
//@route GET /api/receipes
//@acess Public
const getAllReceipes = asyncHandler(async (req, res) => {
	try {
		const receipes = await Receipe.find({}).sort({ likes: -1 });
		res.json(receipes);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});
//@desc GET popular receipes
//@route GET /api/receipes
//@acess Public
const getTodaysReceipes = asyncHandler(async (req, res) => {
	try {
		const receipes = await Receipe.find({}).limit(6).sort({ date: 1 });
		res.json(receipes);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc GET recent receipes
//@route GET /api/receipes
//@acess Public
const getRecentReceipes = asyncHandler(async (req, res) => {
	try {
		const receipes = await Receipe.find({}).limit(4).sort({ date: -1 });

		res.json(receipes);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc GET Receipe by ID
//@route GET /api/receipes/:id
//@acess Public
const getReceipeById = asyncHandler(async (req, res) => {
	try {
		const receipe = await Receipe.findById(req.params.id);
		if (receipe) {
			res.json(receipe);
		} else {
			return res.status(404).json({ message: 'Receipe not found' });
		}
	} catch (err) {
		console.log(err.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Delete a receipe
//@route DELETE /api/receipe/:id
//@acess Private Admin
const deleteReceipe = asyncHandler(async (req, res) => {
	try {
		const receipe = await Receipe.findById(req.params.id);
		if (receipe) {
			await receipe.remove();
			res.json({
				message: 'Receipe removed',
			});
		} else {
			return res.status(404).json({ message: 'Receipe not found' });
		}
	} catch (err) {
		console.log(err.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Create Receipe
//@route POST /api/receipe
//@acess Private
const createReceipe = asyncHandler(async (req, res) => {
	try {
		const receipe = new Receipe({
			title: req.body.title || 'No Title',
			about: req.body.about,
			conclusion: req.body.conclusion,
			description: req.body.description || [
				{
					step: 'turn on your game lol',
				},
			],
			ingredients: req.body.ingredients || [
				{
					ingredient: 'no title',
					qty: '',
				},
			],
			image:
				req.body.image ||
				'https://thumbs.dreamstime.com/z/recipe-word-text-green-leaf-logo-icon-design-white-background-suitable-card-typography-143638205.jpg',
			user: req.user._id,
		});
		const createdReceipe = await receipe.save();
		res.status(201).json(createdReceipe);
	} catch (err) {
		console.log(err.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Update Receipe
//@route  PUT /api/products/:id
//@acess Private Admin
const updateReceipe = asyncHandler(async (req, res) => {
	try {
		const { title, image, description, ingredients, approved } = req.body;
		const receipe = await Receipe.findById(req.params.id);
		if (receipe) {
			// receipe.title = title;
			// receipe.image = image;
			// receipe.description = description;
			// receipe.ingredients = ingredients;
			receipe.approved = approved;
			const updatedReceipe = await receipe.save();
			res.json(updatedReceipe);
		} else {
			return res.status(404).json({ message: 'Receipe not found' });
		}
	} catch (err) {
		console.log(err.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Like a Receipe
//@route PUT /api/like/:id
//@acess Private
const likeReceipe = asyncHandler(async (req, res) => {
	try {
		const receipe = await Receipe.findById(req.params.id);
		if (receipe) {
			if (
				receipe.likes.some(
					({ user }) => user.toString() === req.user._id.toString()
				)
			) {
				return res.status(400).json({ message: 'Post already liked' });
			}

			receipe.likes.unshift({ user: req.user._id });

			await receipe.save();

			return res.json(receipe.likes);
		} else {
			return res.status(404).json({ message: 'Receipe not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc UnLike a Receipe
//@route PUT /api/unlike/:id
//@acess Private
const unLikeReceipe = asyncHandler(async (req, res) => {
	try {
		const receipe = await Receipe.findById(req.params.id);

		if (receipe) {
			if (
				!receipe.likes.some(
					({ user }) => user.toString() === req.user._id.toString()
				)
			) {
				return res.status(400).json({
					message: 'Receipe is not liked',
				});
			}
			receipe.likes = receipe.likes.filter(
				({ user }) => user.toString() !== req.user._id.toString()
			);
			await receipe.save();
			return res.json(receipe.likes);
		} else {
			return res.status(404).json({ message: 'Receipe not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc  Feedback Comment on Receipe
//@route PUT /api/receipe/comment/:id
//@acess Private
const feedbackComment = asyncHandler(async (req, res) => {
	try {
		const receipe = await Receipe.findById(req.params.id);
		if (receipe) {
			const newComment = {
				text: req.body.text,
				name: req.user.name,
				user: req.user._id,
			};
			if (
				receipe.comments.some(
					(comment) => comment.user.toString() === req.user._id.toString()
				)
			) {
				return res.status(400).json({
					message: 'You have already given your feedback',
				});
			}

			receipe.comments.unshift(newComment);
			await receipe.save();
			return res.json(receipe.comments);
		} else {
			return res.status(404).json({ message: 'Receipe not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

//2desc Delete comment on receipe
//@route DELETE /api/receipe/comment/:id/:commentID
//acess Private
const deleteFeedbackComment = asyncHandler(async (req, res) => {
	try {
		const receipe = await Receipe.findById(req.params.id);
		if (receipe) {
			const comment = receipe.comments.find(
				(comment) => comment._id.toString() === req.params.commentID.toString()
			);
			if (!comment) {
				return res.status(404).json({
					message: 'Comment does not exists',
				});
			}
			if (comment.user.toString() !== req.user._id.toString()) {
				return res.status(401).json({
					message: 'User not authorized',
				});
			}

			receipe.comments = receipe.comments.filter(
				({ id }) => id !== req.params.commentID
			);
			await receipe.save();
			return res.json(receipe.comments);
		} else {
			return res.status(404).json({ message: 'Receipe not found' });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error('Server Error');
	}
});

export {
	getAllReceipes,
	getRecentReceipes,
	getTodaysReceipes,
	getReceipeById,
	createReceipe,
	updateReceipe,
	deleteReceipe,
	likeReceipe,
	unLikeReceipe,
	feedbackComment,
	deleteFeedbackComment,
};
