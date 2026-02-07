import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import BookmarkCard from '../components/BookmarkCard';
import SearchFilter from '../components/SearchFilter';
import { bookmarksService } from '../lib/bookmarks';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filters, setFilters] = useState({ search: '', tags: '' });
  const [fetchingTitle, setFetchingTitle] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: '',
    isFavorite: false,
  });

  useEffect(() => {
    fetchBookmarks();
  }, [filters, showFavorites]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.tags) params.tags = filters.tags;
      if (showFavorites) params.favorite = 'true';

      const response = await bookmarksService.getBookmarks(params);
      setBookmarks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTitle = async () => {
    if (!formData.url) {
      setError('Please enter a URL first');
      return;
    }

    setFetchingTitle(true);
    setError('');

    try {
      const response = await bookmarksService.fetchTitle(formData.url);
      setFormData({ ...formData, title: response.data.title });
    } catch (err) {
      setError('Could not fetch title from URL');
    } finally {
      setFetchingTitle(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const bookmarkData = {
        title: formData.title,
        url: formData.url,
        description: formData.description,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        isFavorite: formData.isFavorite,
      };

      if (editingBookmark) {
        await bookmarksService.updateBookmark(editingBookmark._id, bookmarkData);
      } else {
        await bookmarksService.createBookmark(bookmarkData);
      }

      setShowModal(false);
      setFormData({
        title: '',
        url: '',
        description: '',
        tags: '',
        isFavorite: false,
      });
      setEditingBookmark(null);
      fetchBookmarks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save bookmark');
    }
  };

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setFormData({
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description || '',
      tags: bookmark.tags.join(', '),
      isFavorite: bookmark.isFavorite,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return;

    try {
      await bookmarksService.deleteBookmark(id);
      fetchBookmarks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete bookmark');
    }
  };

  const handleToggleFavorite = async (bookmark) => {
    try {
      await bookmarksService.updateBookmark(bookmark._id, {
        ...bookmark,
        isFavorite: !bookmark.isFavorite,
      });
      fetchBookmarks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update bookmark');
    }
  };

  const handleAddNew = () => {
    setEditingBookmark(null);
    setFormData({
      title: '',
      url: '',
      description: '',
      tags: '',
      isFavorite: false,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBookmark(null);
    setFormData({
      title: '',
      url: '',
      description: '',
      tags: '',
      isFavorite: false,
    });
  };

  return (
    <ProtectedRoute>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">My Bookmarks</h1>
          <button onClick={handleAddNew} className="btn-primary">
            + New Bookmark
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <SearchFilter
          onSearch={() => {}}
          onFilter={setFilters}
          showFavorites={showFavorites}
          onToggleFavorites={() => setShowFavorites(!showFavorites)}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading bookmarks...</div>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No bookmarks found. Create your first bookmark!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingBookmark ? 'Edit Bookmark' : 'Create New Bookmark'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    URL *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData({ ...formData, url: e.target.value })
                      }
                      required
                      className="input-field flex-1"
                      placeholder="https://example.com"
                    />
                    <button
                      type="button"
                      onClick={handleFetchTitle}
                      disabled={fetchingTitle}
                      className="btn-secondary whitespace-nowrap"
                    >
                      {fetchingTitle ? 'Fetching...' : 'Fetch Title'}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="input-field"
                    placeholder="Enter bookmark title"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="4"
                    className="input-field"
                    placeholder="Add a description (optional)"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="input-field"
                    placeholder="e.g., development, design, inspiration"
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFavorite}
                      onChange={(e) =>
                        setFormData({ ...formData, isFavorite: e.target.checked })
                      }
                      className="mr-2 h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700 font-medium">
                      Mark as Favorite
                    </span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingBookmark ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}