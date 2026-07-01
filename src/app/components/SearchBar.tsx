export default function SearchBar() {
  return (
    <div className="max-w-3xl mx-auto">

      <input
        type="text"
        placeholder="Search articles, AI tools, investing, business..."
        className="w-full rounded-2xl border border-gray-300 px-6 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}