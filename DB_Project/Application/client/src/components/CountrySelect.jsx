import { useState, useEffect } from 'react';

// Chakra UI
import { Select } from '@chakra-ui/react';

// API
import { getCountries } from '../api/global.requests';

const CountrySelect = ({ value, setValue }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const res = await getCountries();
    setCountries(res);
  };

  return (
    <Select
      placeholder='Select option'
      variant='filled'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {countries.map((country) => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ))}
    </Select>
  );
};

export default CountrySelect;
