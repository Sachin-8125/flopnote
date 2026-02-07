export default function BookmarkCard({ bookmark, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {bookmark.title}
          </h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 break-all text-sm"
          >
            {bookmark.url}
          </a>
        </div>
        <button
          onClick={() => onToggleFavorite(bookmark)}
          className="text-2xl focus:outline-none ml-2"
        >
          {bookmark.isFavorite ? '⭐' : '☆'}
        </button>
      </div>
      {bookmark.description && (
        <p className="text-gray-600 mb-4">{bookmark.description}</p>
      )}
      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {bookmark.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
        <div className="space-x-2">
          <button
            onClick={() => onEdit(bookmark)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(bookmark._id)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}