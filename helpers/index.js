const sortAlphabatically = (data, property) =>
  data.sort((a, b) =>
    a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
  );
const sortByHighestNum = (data, property) =>
  data.sort((a, b) => b[property] - a[property]);
const sortByLowestNum = (data, property) =>
  data.sort((a, b) => a[property] - b[property]);

export { sortAlphabatically, sortByHighestNum, sortByLowestNum };
