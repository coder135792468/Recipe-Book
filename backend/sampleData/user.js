import bcrypt from 'bcryptjs';
const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
		bio: 'hello i am the admin',
		avatar: 'https://wallpapercave.com/wp/wp2377581.jpg',
	},
	{
		name: 'coder',
		email: 'coder@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
		bio: 'learning.......',
		avatar: 'https://wallpapercave.com/wp/wp2377582.jpg',
	},
	{
		name: 'ash',
		email: 'ash@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
		bio: 'i am tester of this code',
		avatar: 'https://wallpapercave.com/wp/wp2377583.jpg',
	},
];

export default users;
