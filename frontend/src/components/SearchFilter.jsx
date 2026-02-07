import { useState } from 'react';

export default function SearchFilter({ onSearch, onFilter, showFavorites, onToggleFavorites }) {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ search, tags });
  };

  const handleClear = () => {
    setSearch('');
    setTags('');
    onFilter({ search: '', tags: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title or content..."
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            placeholder="e.g., work, personal"
            className="input-field"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <button type="submit" className="btn-primary">
          Apply Filters
        </button>
        <button type="button" onClick={handleClear} className="btn-secondary">
          Clear
        </button>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={onToggleFavorites}
            className="mr-2 h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700 font-medium">Favorites Only</span>
        </label>
      </div>
    </form>
  );
}