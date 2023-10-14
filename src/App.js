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
import Protected from './features/auth/components/Protected';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
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
    element:<Protected><CartPage></CartPage></Protected>,
  },
  {
    path:'/checkout',
    element:<Protected><Checkout></Checkout></Protected>
  },
  {
    path:'/productDetails/:id',
    element:<Protected><ProductDetailsPage></ProductDetailsPage></Protected>
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
