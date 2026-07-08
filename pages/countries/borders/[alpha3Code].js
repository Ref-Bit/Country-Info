import Head from 'next/head';
import { CountriesSingle } from '../../../components';

export const getStaticPaths = async () => {
  const res = await fetch('https://countries.dev/countries');
  const data = await res.json();
  const paths = data.map(country => {
    return {
      params: {
        alpha3Code: country.alpha3Code,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const alpha3Code = context.params.alpha3Code;
  const res = await fetch(`https://countries.dev/alpha/${alpha3Code}`);
  const data = await res.json();
  const country = data[0];

  return {
    props: { country },
  };
};

export default function BorderCountry({ country }) {
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
