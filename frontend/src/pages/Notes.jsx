import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import NoteCard from '../components/NoteCard';
import SearchFilter from '../components/SearchFilter';
import { notesService } from '../lib/notes';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filters, setFilters] = useState({ search: '', tags: '' });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    isFavorite: false,
  });

  useEffect(() => {
    fetchNotes();
  }, [filters, showFavorites]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.tags) params.tags = filters.tags;
      if (showFavorites) params.favorite = 'true';

      const response = await notesService.getNotes(params);
      setNotes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const noteData = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        isFavorite: formData.isFavorite,
      };

      if (editingNote) {
        await notesService.updateNote(editingNote._id, noteData);
      } else {
        await notesService.createNote(noteData);
      }

      setShowModal(false);
      setFormData({ title: '', content: '', tags: '', isFavorite: false });
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save note');
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
      isFavorite: note.isFavorite,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      await notesService.deleteNote(id);
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  const handleToggleFavorite = async (note) => {
    try {
      await notesService.updateNote(note._id, {
        ...note,
        isFavorite: !note.isFavorite,
      });
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  const handleAddNew = () => {
    setEditingNote(null);
    setFormData({ title: '', content: '', tags: '', isFavorite: false });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setFormData({ title: '', content: '', tags: '', isFavorite: false });
  };

  return (
    <ProtectedRoute>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">My Notes</h1>
          <button onClick={handleAddNew} className="btn-primary">
            + New Note
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
            <div className="text-gray-600">Loading notes...</div>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No notes found. Create your first note!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
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
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h2>

              <form onSubmit={handleSubmit}>
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
                    placeholder="Enter note title"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                    rows="8"
                    className="input-field"
                    placeholder="Write your note here..."
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
                    placeholder="e.g., work, ideas, personal"
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
                    {editingNote ? 'Update' : 'Create'}
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