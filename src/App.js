import React from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SiognupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path:"/signup",
    element:<SignupPage></SignupPage>,
  },
  {
    path:"/cart",
    element:<CartPage></CartPage>,
  },
  {
    path:'/checkout',
    element:<Checkout></Checkout>
  },
  {
    path:'/productDetails',
    element:<ProductDetailsPage></ProductDetailsPage>
  }
]);

function App() {
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
