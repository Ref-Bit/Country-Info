import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import {
  sortAlphabatically,
  sortByHighestNum,
  sortByLowestNum,
} from '../../helpers';
import ScrollTop from '../Partials/ScrollTop';

export default function Countries({
  data,
  searchTerm,
  populationFilterTerm,
  regionFilterTerm,
}) {
  const [countries, setCountries] = useState([]);
  const [perPage, setPerPage] = useState(6);
  const [hasMore, setHasMore] = useState(true);

  const nextData = () => {
    if (countries.length >= data.length) {
      setHasMore(false);
    }

    if (regionFilterTerm !== '' || populationFilterTerm !== '') {
      setCountries(countries);
      setPerPage(perPage + 3);
    }

    if (regionFilterTerm === '' || populationFilterTerm === '') {
      setCountries(preData => {
        const _data = [...preData, ...data.slice(perPage, perPage + 3)];
        return _data;
      });
      setPerPage(perPage + 3);
    }
  };

  useEffect(() => {
    let filterBySearch = [];
    let filterByTerm = [];

    if (searchTerm) {
      if (regionFilterTerm) {
        filterBySearch = data
          .filter(country => country.region === regionFilterTerm)
          .filter(country =>
            country.name.toLowerCase().startsWith(searchTerm?.toLowerCase())
          );
        if (populationFilterTerm === 'high') {
          filterBySearch = sortByHighestNum(
            filterBySearch,
            'population'
          ).filter(country =>
            country.name.toLowerCase().startsWith(searchTerm?.toLowerCase())
          );
        }
        if (populationFilterTerm === 'low') {
          filterBySearch = sortByLowestNum(filterBySearch, 'population').filter(country =>
            country.name.toLowerCase().startsWith(searchTerm?.toLowerCase())
          );
        }
      } else if (populationFilterTerm === 'high') {
        filterBySearch = sortByHighestNum(data, 'population').filter(country =>
          country.name.toLowerCase().startsWith(searchTerm?.toLowerCase())
        );
      } else if (populationFilterTerm === 'low') {
        filterBySearch = sortByLowestNum(data, 'population').filter(country =>
          country.name.toLowerCase().startsWith(searchTerm?.toLowerCase())
        );
      } else {
        filterBySearch = sortAlphabatically(data, 'name').filter(country =>
          country.name.toLowerCase().startsWith(searchTerm?.toLowerCase())
        );
      }
      setCountries(filterBySearch);
      setHasMore(false);
    } else if (regionFilterTerm) {
      filterByTerm = data.filter(
        country => country.region === regionFilterTerm
      );
      if (populationFilterTerm === 'high') {
        filterByTerm = sortByHighestNum(filterByTerm, 'population');
      } else if (populationFilterTerm === 'low') {
        filterByTerm = sortByLowestNum(filterByTerm, 'population');
      } else {
        filterByTerm = sortAlphabatically(filterByTerm, 'name');
      }
      setCountries(filterByTerm);
      setHasMore(false);
    } else if (populationFilterTerm === 'high') {
      filterByTerm = sortByHighestNum(data, 'population');
      setCountries(filterByTerm);
      setHasMore(false);
    } else if (populationFilterTerm === 'low') {
      filterByTerm = sortByLowestNum(data, 'population');
      setCountries(filterByTerm);
      setHasMore(false);
    } else {
      setCountries(data.slice(0, 6));
      setHasMore(true);
    }
  }, [regionFilterTerm, populationFilterTerm, searchTerm]);

  return (
    <>
      <ScrollTop />
      {countries.length > 0 ? (
        <InfiniteScroll
          dataLength={countries.length} //This is important field to render the next data
          next={nextData}
          hasMore={hasMore}
          loader={
            <h4 className="dark:text-gray-100 text-gray-900 text-center text-lg my-4 font-semibold">
              Loading...
            </h4>
          }
          endMessage={
            !searchTerm && (
              <p className="dark:text-gray-100 text-gray-900 text-center text-lg my-4 font-semibold">
                Yay! You have seen it all
              </p>
            )
          }
          style={{ width: '100%' }}
        >
          <div className="flex flex-wrap -m-4">
            {countries
              .filter(country => country.name !== 'Israel')
              .map((country, i) => (
                <div className="xl:w-1/3 md:w-1/2 py-6 px-3" key={i}>
                  <div className="border-b-4 border-gray-300 hover:border-rose-500 p-4 dark:bg-gray-800 bg-gray-100 rounded-lg shadow-xl hover:shadow-sm transform -skew-y-2 hover:skew-y-0 transition duration-300">
                    <div className="relative -top-12 w-16 h-16 inline-flex items-center justify-center bg-rose-300 rounded-full">
                      <img src={country?.flag} className="w-12 h-10 rounded" />
                    </div>
                    <div className="relative -top-4 font-semibold dark:text-gray-100 text-gray-900">
                      <h2 className="text-xl mb-2">{country.name}</h2>
                      <ul>
                        <li>
                          <span className="text-rose-500">Capital:&nbsp;</span>
                          {country.capital ? country.capital : 'None'}
                        </li>
                        <li>
                          <span className="text-rose-500">
                            Population:&nbsp;
                          </span>
                          {country.population}
                        </li>
                        <li>
                          <span className="text-rose-500">Region:&nbsp;</span>
                          {country.region ? country.region : 'None'}
                        </li>
                      </ul>
                      <Link href={`/countries/${country.name}`}>
                        <a className="block mt-5">
                          Learn More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-flex w-6 h-6 transform rotate-90 animate-pulse text-rose-500 fill-current mx-2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14 19h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm0 2h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm.25 2h-4.5l1.188.782c.154.138.38.218.615.218h.895c.234 0 .461-.08.615-.218l1.187-.782zm3.75-13.799c0 3.569-3.214 5.983-3.214 8.799h-1.989c-.003-1.858.87-3.389 1.721-4.867.761-1.325 1.482-2.577 1.482-3.932 0-2.592-2.075-3.772-4.003-3.772-1.925 0-3.997 1.18-3.997 3.772 0 1.355.721 2.607 1.482 3.932.851 1.478 1.725 3.009 1.72 4.867h-1.988c0-2.816-3.214-5.23-3.214-8.799 0-3.723 2.998-5.772 5.997-5.772 3.001 0 6.003 2.051 6.003 5.772zm4-.691v1.372h-2.538c.02-.223.038-.448.038-.681 0-.237-.017-.464-.035-.69h2.535zm-10.648-6.553v-1.957h1.371v1.964c-.242-.022-.484-.035-.726-.035-.215 0-.43.01-.645.028zm-3.743 1.294l-1.04-1.94 1.208-.648 1.037 1.933c-.418.181-.822.401-1.205.655zm10.586 1.735l1.942-1.394.799 1.115-2.054 1.473c-.191-.43-.423-.827-.687-1.194zm-3.01-2.389l1.038-1.934 1.208.648-1.041 1.941c-.382-.254-.786-.473-1.205-.655zm-10.068 3.583l-2.054-1.472.799-1.115 1.942 1.393c-.264.366-.495.763-.687 1.194zm13.707 6.223l2.354.954-.514 1.271-2.425-.982c.21-.397.408-.812.585-1.243zm-13.108 1.155l-2.356 1.06-.562-1.251 2.34-1.052c.173.433.371.845.578 1.243zm-1.178-3.676h-2.538v-1.372h2.535c-.018.226-.035.454-.035.691 0 .233.018.458.038.681z" />
                          </svg>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </InfiniteScroll>
      ) : (
        <h1 className="dark:text-gray-100 text-4xl font-bold">
          Not Found Country, try Mars...?
        </h1>
      )}
    </>
  );
}
