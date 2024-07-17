import API_URI from './endpoint';

export const getProfileInfo = async (id) => {
  const res = await fetch(`${API_URI}/customer/${id}`);

  if (res.ok) {
    const profileInfo = await res.json();
    return profileInfo;
  }
  return null;
};

export const updateProfileInfo = async (profile) => {
  const res = await fetch(`${API_URI}/customer/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });

  return res.ok ? true : false;
};

export const getHistory = async (id) => {
  const res = await fetch(`${API_URI}/customer/${id}/history`);
  const history = await res.json();
  return history;
};

export const rentShow = async (customerId, showId) => {
  const res = await fetch(`${API_URI}/customer/rental`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customerId, showId }),
  });

  return res.ok ? true : false;
};
