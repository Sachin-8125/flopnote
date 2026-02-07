export default function NoteCard({ note, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{note.title}</h3>
        <button
          onClick={() => onToggleFavorite(note)}
          className="text-2xl focus:outline-none text-yellow-400"
        >
          {note.isFavorite ? '⭐' : '☆'}
        </button>
      </div>
      <p className="text-gray-300 mb-4 whitespace-pre-wrap">{note.content}</p>
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full text-sm border border-blue-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
        <div className="space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-400 hover:text-red-300 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}