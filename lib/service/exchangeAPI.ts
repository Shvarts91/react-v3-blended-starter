import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data',
  headers: { apikey: apiKey ?? '' },
});

interface ExchangeCurrencyCredentials {
  amount: string;
  from: string;
  to: string;
}

interface ExchangeCurrencyResponse {
  amount: string;
  from: string;
  to: string;
  rate: string;
  results: string;
}

export const exchangeCurrency = async (
  credentials: ExchangeCurrencyCredentials
): Promise<ExchangeCurrencyResponse> => {
  const {
    data: { query, info, result },
  } = await instance.get('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

export const latestRates = async (params) => {
  const { data } = await instance.get(`/latest`, {
    params,
  });

  return Object.entries(data.rates);
};
