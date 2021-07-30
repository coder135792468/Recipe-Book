import express from 'express';
import {
	loginUser,
	registerUser,
	getUserById,
	getUserProfile,
	getUsers,
	updateUser,
	updateUserProfile,
	deleteUser,
} from '../controllers/user.js';
import { protect, admin } from '../middlewares/auth.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, getUsers);
router.post('/login', loginUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

router
	.route('/:id')
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)
	.delete(protect, admin, deleteUser);

export default router;
