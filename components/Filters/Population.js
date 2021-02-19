export default function Population({ setFilterTerm }) {
  const handleChange = e => {
    setFilterTerm(prevData => {
      return { ...prevData, population: e.target.value };
    });
  };

  return (
    <div id="population_filter" className="mx-2">
      <label>
        <select
          onChange={handleChange}
          className="block w-full form-select form-select-dark focus:ring focus:ring-rose-500 focus:ring-opacity-50"
        >
          <option value="">Filter by Population</option>
          <option value="high">Highest</option>
          <option value="low">Lowest</option>
        </select>
      </label>
    </div>
  );
}
