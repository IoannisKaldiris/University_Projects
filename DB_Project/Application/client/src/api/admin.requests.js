import API_URI from './endpoint';

export const getCustomers = async () => {
  const res = await fetch(`${API_URI}/admin/customers`);
  const customers = await res.json();
  return customers;
};

export const getEmployees = async (adminId) => {
  const res = await fetch(`${API_URI}/admin/employees/${adminId}`);
  const employees = await res.json();
  return employees;
};

export const deleteCustomer = async (id) => {
  const res = await fetch(`${API_URI}/admin/customers/${id}`, {
    method: 'DELETE',
  });

  return res.ok ? true : false;
};

export const deleteEmployee = async (id) => {
  const res = await fetch(`${API_URI}/admin/employees/${id}`, {
    method: 'DELETE',
  });

  return res.ok ? true : false;
};

export const addCustomer = async (customer) => {
  const res = await fetch(`${API_URI}/admin/customer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });

  return res.ok ? true : false;
};

export const addEmployee = async (employee) => {
  const res = await fetch(`${API_URI}/admin/employee`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });

  return res.ok ? true : false;
};

export const employeeAdminStatus = async (id, isAdmin) => {
  const res = await fetch(`${API_URI}/admin/employees/adminStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, isAdmin }),
  });

  return res.ok ? true : false;
};

export const getSales = async () => {
  const res = await fetch(`${API_URI}/admin/sales`);
  const sales = await res.json();
  return { filmSales: sales[0], seriesSales: sales[1] };
};

export const getPricing = async () => {
  const res = await fetch(`${API_URI}/admin/prices`);
  const pricing = await res.json();
  return pricing;
};

export const updatePricing = async (subType, showType, amount) => {
  const res = await fetch(`${API_URI}/admin/prices`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subType, showType, amount }),
  });

  return res.ok ? true : false;
};

export const getLogs = async (
  offset,
  limit,
  customerId = null,
  tableName = null
) => {
  let res;
  if (customerId && tableName) {
    res = await fetch(
      `${API_URI}/admin/logs/both/${customerId}/${tableName}/${offset}/${limit}`
    );
  } else if (customerId) {
    res = await fetch(
      `${API_URI}/admin/logs/customer/${customerId}/${offset}/${limit}`
    );
  } else if (tableName) {
    res = await fetch(
      `${API_URI}/admin/logs/table/${tableName}/${offset}/${limit}`
    );
  } else {
    res = await fetch(`${API_URI}/admin/logs/${offset}/${limit}`);
  }

  const logs = await res.json();

  return logs;
};

export const getLogCustomerIDs = async () => {
  const res = await fetch(`${API_URI}/admin/logs/customerIDs`);
  const customerIDs = await res.json();
  return customerIDs;
};

export const getLogTableNames = async () => {
  const res = await fetch(`${API_URI}/admin/logs/tableNames`);
  const tableNames = await res.json();
  return tableNames;
};
