import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Footer, Navbar } from '@components';
import {
  AddProduct,
  Banner,
  Category,
  EditProduct,
  ForgotPassword,
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
    path: '/products',
    element: <Product />,
  },
  {
    path: '/products/:id',
    element: <ProductDetail />,
  },
  {
    path: '/products/add',
    element: <AddProduct />,
  },
  {
    path: '/products/edit/:id',
    element: <EditProduct />,
  },
  {
    path: '/banners',
    element: <Banner />,
  },
  {
    path: '/categories',
    element: <Category />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/promotions',
    element: <Promotion />,
  },
  {
    path: '/ratings',
    element: <Rating />,
  },
  {
    path: '/stocks',
    element: <Stock />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} element={element} path={path} />
          ))}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
