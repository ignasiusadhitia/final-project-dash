import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Footer, Navbar } from '@components';
import {
  AddProduct,
  AddPromotion,
  Banner,
  Category,
  EditProduct,
  Home,
  Login,
  NotFound,
  Orders,
  Product,
  ProductDetail,
  Promotion,
  Rating,
  Register,
  Stock,
  FormStock,
  UpdateBanner,

} from '@pages';

const routes = [
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
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
    path: 'banners/add',
    element: <UpdateBanner />,
  },
  {
    path: 'banners/detail/:id',
    element: <UpdateBanner />,
  },
  {
    path: 'banners/edit/:id',
    element: <UpdateBanner />,
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
    path: 'promotions/add',
    element: <AddPromotion />,
  },
  {
    path: 'promotions/edit/:id',
    element: <AddPromotion />,
  },
  {
    path: 'promotions/detail/:id',
    element: <AddPromotion />,
  },
  {
    path: 'ratings',
    element: <Rating />,
  },
  {
    path: 'stocks',
    element: <Stock />,
  },
  {
    path: 'stocks/add',
    element: <FormStock />,
  },
  {
    path: 'stocks/edit/:id',
    element: <FormStock />,
  },
  {
    path: 'stocks/detail/:id',
    element: <FormStock />,
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
