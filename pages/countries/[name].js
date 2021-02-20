import Head from 'next/head';
import { CountriesSingle } from '../../components';

export const getStaticPaths = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json();
  const paths = data.map(country => {
    return {
      params: {
        name: country.name,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const name = context.params.name;
  const res = await fetch(
    encodeURI(`https://restcountries.eu/rest/v2/name/${name}`)
  );
  const data = await res.json();
  const country = data[0];

  return {
    props: { country },
  };
};

export default function Country({ country }) {
  return (
    <div>
      <Head>
        <title>Country Info | {country.name}</title>
        <link rel="icon" href={country.flag} />
      </Head>

      <div className="min-h-screen">
        <CountriesSingle country={country} />
      </div>
    </div>
  );
}
