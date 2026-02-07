export default function BookmarkCard({ bookmark, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            {bookmark.title}
          </h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 break-all text-sm"
          >
            {bookmark.url}
          </a>
        </div>
        <button
          onClick={() => onToggleFavorite(bookmark)}
          className="text-2xl focus:outline-none ml-2 text-yellow-400"
        >
          {bookmark.isFavorite ? '⭐' : '☆'}
        </button>
      </div>
      {bookmark.description && (
        <p className="text-gray-300 mb-4">{bookmark.description}</p>
      )}
      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {bookmark.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-900/50 text-green-200 rounded-full text-sm border border-green-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
        <div className="space-x-2">
          <button
            onClick={() => onEdit(bookmark)}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(bookmark._id)}
            className="text-red-400 hover:text-red-300 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}