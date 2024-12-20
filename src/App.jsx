import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Sidebar } from '@components';
import ProtectedLayout from '@layouts/ProtectedLayout';
import {
  AddProduct,
  Banner,
  Category,
  EditProduct,
  ForgotPassword,
  Home,
  InputOTP,
  Login,
  NotFound,
  Orders,
  Product,
  ProductDetail,
  Promotion,
  Rating,
  SignUp,
  Stock,
} from '@pages';

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/input-otp',
    element: <InputOTP />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const protectedRoutes = [
  {
    path: 'products',
    element: <Product />,
  },
  {
    path: 'products/:id',
    element: <ProductDetail />,
  },
  {
    path: 'products/add',
    element: <AddProduct />,
  },
  {
    path: 'products/edit/:id',
    element: <EditProduct />,
  },
  {
    path: 'banners',
    element: <Banner />,
  },
  {
    path: 'categories',
    element: <Category />,
  },
  {
    path: 'orders',
    element: <Orders />,
  },
  {
    path: 'promotions',
    element: <Promotion />,
  },
  {
    path: 'ratings',
    element: <Rating />,
  },
  {
    path: 'stocks',
    element: <Stock />,
  },
];

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-surface-background">
        <Sidebar />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} element={element} path={path} />
          ))}

          <Route element={<ProtectedLayout />} path="/dashboard">
            <Route index element={<Home />} />

            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} element={element} path={path} />
            ))}
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
