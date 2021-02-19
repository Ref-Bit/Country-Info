export default function Continent({ setFilterTerm }) {
  const handleChange = e => {
    setFilterTerm(prevData => {
      return { ...prevData, region: e.target.value };
    });
  };

  return (
    <div id="continent_filter" className="mx-2">
      <label>
        <select
          onChange={handleChange}
          className="block w-full form-select form-select-dark focus:ring focus:ring-rose-500 focus:ring-opacity-50"
        >
          <option value="">Filter by Continent</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Polar">Polar</option>
        </select>
      </label>
    </div>
  );
}
