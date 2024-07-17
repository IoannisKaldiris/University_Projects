import { useState, useEffect } from 'react';

// Chakra UI
import { Select } from '@chakra-ui/react';

// API
import { getAddresses } from '../api/global.requests';

const CitySelect = ({ value, setValue, cityId }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses(cityId);
  }, [cityId]);

  const fetchAddresses = async (cityId) => {
    const res = await getAddresses(cityId);
    setAddresses(res);
  };

  return (
    <Select
      placeholder='Select option'
      variant='filled'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {addresses.map((address) => (
        <option key={address.id} value={address.id}>
          {address.street}, {address.district}, {address.postal_code},{' '}
          {address.phone}
        </option>
      ))}
    </Select>
  );
};

export default CitySelect;
