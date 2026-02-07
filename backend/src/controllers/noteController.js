import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
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

    const notes = await Note.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, tags, isFavorite } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      isFavorite: isFavorite || false,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    let note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    const { title, content, tags, isFavorite } = req.body;

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, isFavorite },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    await Note.findByIdAndDelete(req.params.id);

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