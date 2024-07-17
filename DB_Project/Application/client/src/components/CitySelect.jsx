import { useState, useEffect } from 'react';

// Chakra UI
import { Select } from '@chakra-ui/react';

// API
import { getCities } from '../api/global.requests';

const CitySelect = ({ value, setValue, countryId }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities(countryId);
  }, [countryId]);

  const fetchCities = async (countryId) => {
    const res = await getCities(countryId);
    setCities(res);
  };

  return (
    <Select
      placeholder='Select option'
      variant='filled'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </Select>
  );
};

export default CitySelect;
