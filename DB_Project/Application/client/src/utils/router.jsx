import { createBrowserRouter, redirect } from 'react-router-dom';

// Layouts
import CustomerLayout from '../components/Layouts/CustomerLayout';
import EmployeeLayout from '../components/Layouts/EmployeeLayout';
import AdminLayout from '../components/Layouts/AdminLayout';

// Pages
import Login from '../pages/Login';

// Customer Pages
import Films from '../pages/Customer/Films';
import Series from '../pages/Customer/Series';
import Profile from '../pages/Customer/Profile';
import FilmDetails from '../pages/Customer/FilmDetails';
import SeriesDetails from '../pages/Customer/SeriesDetails';

// Employee Pages
import EmployeeCustomers from '../pages/Employee/Customers';
import EmployeeData from '../pages/Employee/Data';
import EmployeeSales from '../pages/Employee/Sales';
import EmployeeCustomerDetails from '../pages/Employee/CustomerDetails';
import DataFilms from '../pages/Employee/Data/DataFilms';
import DataSeries from '../pages/Employee/Data/DataSeries';
import DataSeasons from '../pages/Employee/Data/DataSeasons';
import DataEpisodes from '../pages/Employee/Data/DataEpisodes';
import DataCategories from '../pages/Employee/Data/DataCategories';
import DataLanguages from '../pages/Employee/Data/DataLanguages';
import DataActors from '../pages/Employee/Data/DataActors';
import DataAddresses from '../pages/Employee/Data/DataAddresses';
import DataCities from '../pages/Employee/Data/DataCities';
import DataCountries from '../pages/Employee/Data/DataCountries';

// Admin Pages
import AdminCustomers from '../pages/Admin/Customers';
import AdminEmployees from '../pages/Admin/Employees';
import AdminSales from '../pages/Admin/Sales';
import AdminPricing from '../pages/Admin/Pricing';
import AdminLogs from '../pages/Admin/Logs';

// API
import { getFilms, getFilmDetails } from '../api/film.requests';
import { getSeries, getSeriesDetails } from '../api/series.requests';
import { getProfileInfo } from '../api/customer.requests';
import { getStats } from '../api/employee.requests';
import {
  getSales,
  getPricing,
  getLogCustomerIDs,
  getLogTableNames,
} from '../api/admin.requests';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <CustomerLayout />,
    children: [
      {
        path: '/films',
        element: <Films />,
        loader: getFilms,
      },
      {
        path: '/series',
        element: <Series />,
        loader: getSeries,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/films/:id',
        element: <FilmDetails />,
        loader: async ({ params }) => {
          const { film, categories, languages, actors } = await getFilmDetails(
            params.id
          );
          if (!film) return redirect('/films');

          return { film, categories, languages, actors };
        },
      },
      {
        path: '/series/:id',
        element: <SeriesDetails />,
        loader: async ({ params }) => {
          const { series, seasons, episodes } = await getSeriesDetails(
            params.id
          );
          if (!series) return redirect('/series');

          return { series, seasons, episodes };
        },
      },
    ],
  },
  {
    path: '/employee',
    element: <EmployeeLayout />,
    children: [
      {
        path: 'customers',
        element: <EmployeeCustomers />,
      },
      {
        element: <EmployeeData />,
        children: [
          {
            path: 'data/films',
            element: <DataFilms />,
          },
          {
            path: 'data/series',
            element: <DataSeries />,
          },
          {
            path: 'data/seasons',
            element: <DataSeasons />,
          },
          {
            path: 'data/episodes',
            element: <DataEpisodes />,
          },
          {
            path: 'data/categories',
            element: <DataCategories />,
          },
          {
            path: 'data/languages',
            element: <DataLanguages />,
          },
          {
            path: 'data/actors',
            element: <DataActors />,
          },
          {
            path: 'data/addresses',
            element: <DataAddresses />,
          },
          {
            path: 'data/cities',
            element: <DataCities />,
          },
          {
            path: 'data/countries',
            element: <DataCountries />,
          },
        ],
      },
      {
        path: 'sales',
        element: <EmployeeSales />,
        loader: getStats,
      },
      {
        path: 'customers/:id',
        element: <EmployeeCustomerDetails />,
        loader: async ({ params }) => {
          const res = await getProfileInfo(params.id);
          if (!res) return redirect('/employee/customers');

          return { customer: res };
        },
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'customers',
        element: <AdminCustomers />,
      },
      {
        path: 'employees',
        element: <AdminEmployees />,
      },
      {
        path: 'sales',
        element: <AdminSales />,
        loader: getSales,
      },
      {
        path: 'pricing',
        element: <AdminPricing />,
        loader: getPricing,
      },
      {
        path: 'logs',
        element: <AdminLogs />,
        loader: async () => {
          const customerIDs = await getLogCustomerIDs();
          const tableNames = await getLogTableNames();

          return { customerIDs, tableNames };
        },
      },
    ],
  },
  {
    path: '*',
    loader: async () => {
      return redirect('/login');
    },
  },
]);

export default router;
