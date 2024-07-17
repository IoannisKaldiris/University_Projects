import API_URI from './endpoint';

export const validateEmail = async (email) => {
  const resCustomer = await fetch(`${API_URI}/customer/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (resCustomer.ok) {
    const customer = await resCustomer.json();
    return customer;
  }

  const resEmployee = await fetch(`${API_URI}/employee/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (resEmployee.ok) {
    const employee = await resEmployee.json();
    return employee;
  }

  return { loggedIn: false };
};

export const getCountries = async () => {
  const res = await fetch(`${API_URI}/global/countries`);
  const countries = await res.json();
  return countries;
};

export const getCities = async (countryId) => {
  const res = await fetch(`${API_URI}/global/cities/${countryId}`);
  const cities = await res.json();
  return cities;
};

export const getAddresses = async (cityId) => {
  const res = await fetch(`${API_URI}/global/addresses/${cityId}`);
  const addresses = await res.json();
  return addresses;
};
