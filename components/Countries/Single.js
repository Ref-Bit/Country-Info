import Link from 'next/link';

export default function CountryPage({ country }) {
  return (
    <section className="relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-1/3 md:w-1/2 dark:bg-gray-800 dark:text-gray-100 bg-gray-100 text-gray-900 flex flex-col md:ml-auto w-full px-4 md:py-4 mt-4 md:mt-0 rounded-lg border-b-2 hover:border-b-4 border-rose-500 shadow-xl hover:shadow transition duration-300">
          <div>
            <div className="text-4xl font-semibold">
              {country.name}
              {country.nativeName.localeCompare(country.name) === 0 ? null : (
                <>
                  <span className="text-rose-500"> | </span>
                  <span>{country.nativeName}</span>
                </>
              )}
            </div>
            <div className="my-3">
              <img src={country?.flag} className="block w-64 rounded-lg" />
            </div>
          </div>
          <div className="my-3">
            <h1 className="inline-block text-lg">Area:&nbsp;</h1>
            <span className="text-rose-500 font-semibold">
              {country.area} m<sup>2</sup>
            </span>
          </div>
          {country.borders.length > 0 && (
            <div className="my-3">
              <h1 className="text-lg">Borders:</h1>
              <div className="grid grid-cols-8 gap-2">
                {country.borders
                  .filter(border => border !== 'ISR')
                  .map((border, i) => (
                    <Link href={`/countries/borders/${border}`} key={i}>
                      <a
                        className={`${
                          i === 0 ? 'text-left' : 'text-center'
                        } text-rose-500 font-semibold`}
                      >
                        {border}
                      </a>
                    </Link>
                  ))}
              </div>
            </div>
          )}
          <div className="my-3">
            <h1 className="inline-block text-lg">Dial Code:&nbsp;</h1>
            <span className="text-rose-500 font-semibold">
              {country.callingCodes[0]}
            </span>
          </div>
          <div className="my-3">
            <h1 className="text-lg">Currency Info:</h1>
            <div>
              {country.currencies.map((currency, i) => (
                <ul key={i}>
                  <li className="my-1 text-sm">
                    Code:&nbsp;
                    <span className="text-rose-500 font-semibold">
                      {currency.code}
                    </span>
                  </li>
                  <li className="my-1 text-sm">
                    Name:&nbsp;
                    <span className="text-rose-500 font-semibold">
                      {currency.name}
                    </span>
                  </li>
                  {currency.symbol && (
                    <li className="my-1 text-sm">
                      Symbol:&nbsp;
                      <span className="text-rose-500 font-semibold">
                        {currency.symbol}
                      </span>
                    </li>
                  )}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:ml-10 p-10 flex items-end justify-start shadow-xl hover:shadow transition duration-300 relative h-600">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0 opacity-60"
            frameBorder="0"
            title="map"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          ></iframe>
          <div className="dark:bg-gray-800 bg-gray-50 relative left-4 flex flex-wrap py-6 rounded shadow-md w-2/3">
            <div className="lg:w-1/2 px-4">
              <h2 className="title-font dark:text-white text-gray-900 tracking-widest text-xs">
                Population
              </h2>
              <p className="mt-1 font-semibold text-rose-500">
                {country.population}
              </p>
              <h2 className="title-font dark:text-white text-gray-900 tracking-widest text-xs mt-4">
                Languages
              </h2>
              <p className="mt-1">
                {country.languages.map((lang, i, arr) => (
                  <span
                    key={i}
                    className={`${
                      i === 0 ? '' : 'mx-1'
                    } text-rose-500 font-semibold`}
                  >
                    {lang.name} {i < arr.length - 1 ? '-' : ''}
                  </span>
                ))}
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              {country.regionalBlocs.length > 0 && (
                <>
                  <h2 className="title-font dark:text-white text-gray-900 tracking-widest text-xs">
                    Regional Block
                  </h2>
                  <p className="text-rose-500 font-semibold leading-relaxed">
                    {country.regionalBlocs.map((region, i, arr) => (
                      <span
                        key={i}
                        className={`${
                          i === 0 ? '' : 'mx-1'
                        } text-rose-500 font-semibold`}
                      >
                        {region.name} {i < arr.length - 1 ? '-' : ''}
                      </span>
                    ))}
                  </p>
                </>
              )}
              {country.capital && (
                <>
                  <h2 className="title-font dark:text-white text-gray-900 tracking-widest text-xs mt-4">
                    Capital
                  </h2>
                  <p className="leading-relaxed font-semibold text-rose-500">
                    {country.capital}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
