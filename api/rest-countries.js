const API_BASE_URL = process.env.NEXT_PUBLIC_COUNTRIES_DEV_API_URL || "https://countries.dev";

const createClient = (baseUrl) => {
  const headers = { 'Content-Type': 'application/json' };

  return {
    get: async (path) => {
      try {
        const res = await fetch(`${baseUrl}${path}`, { headers });
        // Check for HTTP errors (4xx, 5xx)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return res.json();
      } catch (error) {
        console.error('Fetch failed:', JSON.stringify(error, null, 2));
      }
    },
  }
};

const countriesApi = createClient(API_BASE_URL);

export async function fetchAllCountries() {
  const countries = await countriesApi.get("/countries")
  return countries;
}

export async function fetchCountryByName(name) {
  const country = await countriesApi.get(encodeURI(`/name/${name}`))
  return country;
}

export async function fetchCountryByAlpha(alpha3Code) {
  const country = await countriesApi.get(`/alpha/${alpha3Code}`)
  return country;
}
