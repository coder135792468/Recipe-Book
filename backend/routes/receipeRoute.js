import express from 'express';
import { protect, admin } from '../middlewares/auth.js';
import {
	getAllReceipes,
	getReceipeById,
	createReceipe,
	updateReceipe,
	deleteReceipe,
	likeReceipe,
	unLikeReceipe,
	feedbackComment,
	deleteFeedbackComment,
	getRecentReceipes,
	getTodaysReceipes,
} from '../controllers/receipe.js';
const router = express.Router();

router.route('/recent').get(getRecentReceipes);
router.route('/popular').get(getTodaysReceipes);
router.route('/').get(getAllReceipes).post(protect, createReceipe);
router
	.route('/:id')
	.get(getReceipeById)
	.put(protect, admin, updateReceipe)
	.delete(protect, admin, deleteReceipe);

router.route('/like/:id').put(protect, likeReceipe);
router.route('/unlike/:id').put(protect, unLikeReceipe);

router.route('/comment/:id').put(protect, feedbackComment);
router.route('/comment/:id/:commentID').delete(protect, deleteFeedbackComment);

export default router;
