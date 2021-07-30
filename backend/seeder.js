import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './sampleData/user.js';
import receipes from './sampleData/receipe.js';
import User from './models/User.js';
import Receipe from './models/Receipe.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const sendData = async () => {
	try {
		await User.deleteMany();
		await Receipe.deleteMany();
		const createdUsers = await User.insertMany(users);
		const admin = createdUsers[0]._id;
		const sampleReceipes = receipes.map((receipe) => {
			return {
				...receipe,
				user: admin,
			};
		});

		await Receipe.insertMany(sampleReceipes);
		console.log(`Data Imported`.green.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};
const deleteData = async () => {
	try {
		await User.deleteMany();
		await Receipe.deleteMany();

		console.log(`Data Deleted`.red.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	deleteData();
} else {
	sendData();
}
