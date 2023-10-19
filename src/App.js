import React from 'react';
import { useEffect } from 'react';
import { createRoot } from "react-dom/client";
import { useSelector,useDispatch } from 'react-redux';
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
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetctItemsByUserIdAsync } from './features/cart/cartSlice';
import { PageNotFound } from './pages/404';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import LogOut from './features/auth/components/LogOut';
import ForgetPassword from './features/auth/components/ForgetPassword';
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
    path: "/logout",
    element: <LogOut></LogOut>,
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
  },
  {
    path:'/order-successfull/:id',
    element:<Protected><OrderSuccessPage></OrderSuccessPage></Protected>
  },
  {
    path:'/orders',
    element:<Protected><UserOrderPage></UserOrderPage></Protected>
  },
  {
    path:'/profile',
    element:<Protected><UserProfilePage></UserProfilePage></Protected>
  },
  {
    path:'/forgetPassword',
    element:<ForgetPassword></ForgetPassword>
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
  }
]);

function App() {
  const user=useSelector(selectLoggedInUser);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(user){
      dispatch(fetctItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
