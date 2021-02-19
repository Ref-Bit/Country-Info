export default function Search({ setSearchTerm }) {
  return (
    <div id="search_filter" className="mx-2">
      <label>
        <input
          type="text"
          placeholder="Enter country name..."
          className="w-64 form-input dark:text-gray-100 dark:bg-gray-900 focus:ring focus:ring-rose-500 focus:ring-opacity-50"
          onKeyDown={e =>
            e.key === 'Enter' && e.target.value
              ? setSearchTerm(e.target.value)
              : ''
          }
          onChange={e => setSearchTerm(e.target.value)}
        />
      </label>
    </div>
  );
}
