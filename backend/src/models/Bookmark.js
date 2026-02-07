import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Please provide a valid URL (must start with http:// or https://)'
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isFavorite: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

bookmarkSchema.index({ user: 1, createdAt: -1 });
bookmarkSchema.index({ user: 1, tags: 1 });
bookmarkSchema.index({ user: 1, title: 'text', description: 'text' });

export default mongoose.model('Bookmark', bookmarkSchema);