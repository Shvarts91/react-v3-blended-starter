// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExchangeInfo {
  amount: string;
  from: string;
  to: string;
  rate: string;
  results: string;
}

// interface Rate {}

type CurrencyState = {
  //   rates: Rate[];
  baseCurrency: string;
  exchangeInfo: ExchangeInfo | null;
  setBaseCurrency: (currency: string) => void;
  setExchangeInfo: (exchangeInfo: ExchangeInfo) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      exchangeInfo: null,
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setExchangeInfo: (exchangeInfo: ExchangeInfo) => set({ exchangeInfo }),
    }),
    {
      name: 'currency-store',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
    }
  )
);
