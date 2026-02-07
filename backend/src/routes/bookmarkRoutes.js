import express from 'express';
import {
  getBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  fetchTitle
} from '../controllers/bookmarkController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getBookmarks)
  .post(createBookmark);

router.post('/fetch-title', fetchTitle);

router.route('/:id')
  .get(getBookmark)
  .put(updateBookmark)
  .delete(deleteBookmark);

export default router;