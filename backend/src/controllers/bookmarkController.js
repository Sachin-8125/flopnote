import Bookmark from '../models/Bookmark.js';
import { fetchPageTitle } from '../utils/fetchPageTitle.js';

export const getBookmarks = async (req, res) => {
  try {
    const { search, tags, favorite } = req.query;
    
    let query = { user: req.user.id };

    if (search) {
      query.$text = { $search: search };
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }

    if (favorite === 'true') {
      query.isFavorite = true;
    }

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      data: bookmarks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bookmark
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const createBookmark = async (req, res) => {
  try {
    let { title, url, description, tags, isFavorite, autoFetchTitle } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }

    if (!title && autoFetchTitle) {
      const fetchedTitle = await fetchPageTitle(url);
      title = fetchedTitle || 'Untitled';
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required (or enable autoFetchTitle)'
      });
    }

    const bookmark = await Bookmark.create({
      title,
      url,
      description: description || '',
      tags: tags || [],
      isFavorite: isFavorite || false,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: bookmark
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateBookmark = async (req, res) => {
  try {
    let bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }

    const { title, url, description, tags, isFavorite } = req.body;

    bookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      { title, url, description, tags, isFavorite },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: bookmark
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }

    await Bookmark.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const fetchTitle = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }

    const title = await fetchPageTitle(url);

    if (!title) {
      return res.status(404).json({
        success: false,
        message: 'Could not fetch title from URL'
      });
    }

    res.status(200).json({
      success: true,
      data: { title }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};