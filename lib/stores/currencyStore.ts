// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { latestRates } from '../service/exchangeAPI';

interface ExchangeInfo {
  amount: string;
  from: string;
  to: string;
  rate: string;
  results: string;
}

interface Rate {
  key: string;
  value: string;
}

type CurrencyState = {
  baseCurrency: string;
  exchangeInfo: ExchangeInfo | null;
  setBaseCurrency: (currency: string) => void;
  setExchangeInfo: (exchangeInfo: ExchangeInfo) => void;

  rates: Rate[];
  isLoading: boolean;
  isError: string | null;
  getRates: () => void;

  filter: string;
  setFilter: (filter: string) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      baseCurrency: '',
      exchangeInfo: null,
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),

      setExchangeInfo: (exchangeInfo: ExchangeInfo) => set({ exchangeInfo }),

      rates: [],
      isLoading: false,
      isError: null,
      filter: '',
      setFilter: (filter) => set({ filter }),
      getRates: async () => {
        const { baseCurrency } = get();
        set({ isLoading: true, isError: null });
        try {
          const entries = await latestRates(baseCurrency);
          const filteredRates = entries
            .filter(([key]) => key !== baseCurrency)
            .map(([key, value]) => ({
              key,
              value: (1 / value).toFixed(2),
            }));

          set({
            rates: filteredRates,
            isLoading: false,
          });
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({
              isLoading: false,
              isError: error.message,
            });
          } else {
            set({
              isLoading: false,
              isError: 'Unexpected error',
            });
          }
        }
      },
    }),
    {
      name: 'currency-store',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
    }
  )
);
