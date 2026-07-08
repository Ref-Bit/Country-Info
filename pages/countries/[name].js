import Head from 'next/head';
import { CountriesSingle } from '../../components';
import { fetchAllCountries, fetchCountryByName } from '../../api';

export const getStaticPaths = async () => {
  const data = fetchAllCountries();
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
  const data = await fetchCountryByName(name);
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
        <link rel="icon" href={`https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`} />
      </Head>

      <div className="min-h-screen">
        <CountriesSingle country={country} />
      </div>
    </div>
  );
}
