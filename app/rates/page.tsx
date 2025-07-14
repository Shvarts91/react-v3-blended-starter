'use client';

import { useEffect } from 'react';
import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import RatesList from '@/components/RatesList/RatesList';
import Filter from '@/components/Filter/Filter';

import css from './RatesPage.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function RatesPage() {
  const { baseCurrency, getRates, rates, isLoading, isError, filter } = useCurrencyStore();

  useEffect(() => {
    if (baseCurrency) {
      getRates();
    }
  }, [baseCurrency, getRates]);

  const filteredRates = rates.filter(
    (rate) => rate.key !== baseCurrency && rate.key.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency || '...'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          <Filter />

          {isLoading && <p>Loading...</p>}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}

          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
        </Container>
      </Section>
    </main>
  );
}
