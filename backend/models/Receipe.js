import mongoose from 'mongoose';

const ReceipeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
	},
	about: {
		type: String,
	},
	conclusion: {
		type: String,
	},
	description: [
		{
			step: {
				type: String,
			},
			step_id: {
				type: String,
			},
		},
	],
	ingredients: [
		{
			ingredient: {
				type: String,
			},
			ingredient_id: {
				type: String,
				default: Date.now().toString(),
			},
			qty: {
				type: String,
			},
		},
	],
	time: {
		type: String,
	},
	title: {
		type: String,
	},
	image: {
		type: String,
	},
	approved: {
		type: Boolean,
		default: false,
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
			},
		},
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
			},

			text: {
				type: String,
				required: true,
			},
			name: {
				type: String,
			},
			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

const Receipe = mongoose.model('Receipe', ReceipeSchema);

export default Receipe;
