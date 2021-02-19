import Head from 'next/head';
import { Hero, CountriesList } from '../components';
import { useState } from 'react';

export default function Home({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState({
    population: '',
    region: '',
  });

  return (
    <div>
      <Head>
        <title>Country Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 min-h-screen">
        <Hero setSearchTerm={setSearchTerm} setFilterTerm={setFilterTerm} />
        <CountriesList
          data={data}
          searchTerm={searchTerm}
          populationFilterTerm={filterTerm.population}
          regionFilterTerm={filterTerm.region}
        />
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`https://restcountries.eu/rest/v2/all`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
