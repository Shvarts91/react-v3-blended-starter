import Select, { SingleValue } from 'react-select';
import symbols from './symbols.json';

import './ReactSelect.css';
import styles from './SelectRates.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

type OptionType = {
  value: string;
  label: string;
};

export default function SelectRates({ baseCurrency }: { baseCurrency: string }) {
  const setBaseCurrency = useCurrencyStore((state) => state.setBaseCurrency);

  const options: OptionType[] = symbols;

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setBaseCurrency(selectedOption.value);
    }
  };

  const currentOption = options.find((opt) => opt.value === baseCurrency);

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        isSearchable
        options={options}
        value={currentOption}
        onChange={handleChange}
      />
    </div>
  );
}
