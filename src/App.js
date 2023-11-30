
/* TODO =>> 
NEED TO IMPLEMENT THE ADMIN PAGES :
  1. DO IT EITHER LOCALLY ON A SEPERATE HOST.
  2. OR INTEGRATE IT INTO THE APP USING THE ROUTES.
*/

import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUsersAsync } from './features/user/userSlice';
import LogOut from './features/auth/components/LogOut';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import AdminHome from './pages/AdminHome';
// import AdminProductDetailPage from './pages/AdminProductDetailPage';
// import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
/*
TODO : 
1. ADD ONE MORE HOME PAGE PREFREEABLY LIKE FLIPKART
2. ADD THE SEARCH BAR
3. if possible implement VOICE SEARCH
*/

const router = createBrowserRouter([
  {
    path: "/",
    element:(<Protected><Home /></Protected>),
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: (<LoginPage />),
    errorElement: <ErrorPage />
  },
  {
    path: "/signup",
    element: (<SignUpPage />),
    errorElement: <ErrorPage />
  },
  {
    path: "/cart",
    element: (<Protected><CartPage /></Protected>),
    errorElement: <ErrorPage />
  },
  {
    path: "/checkout",
    element: (<Protected><CheckoutPage /></Protected>),
    errorElement: <ErrorPage />
  },
  {
    path: "/product-detail/:id",
    element: (<Protected><ProductDetailPage /></Protected>),
    errorElement: <ErrorPage />
  },
  // {
  //   path: "/admin/product-detail/:id",
  //   element: (<ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>),
  //   errorElement: <ErrorPage />
  // },
  {
    path: '/order-success/:id',
    element: (<OrderSuccessPage />)
  },
  {
    path: "/profile",
    element: (<Protected><UserProfilePage /></Protected>),
    // we will add a page later
    errorElement: <ErrorPage />
  },
  {
    path: "/orders",
    element: (<Protected><UserOrdersPage /></Protected>),
    // we will add a page later
    errorElement: <ErrorPage />
  },
  {
    path: "/logout",
    element: (<Protected><LogOut /></Protected>),
    // we will add a page later
    errorElement: <ErrorPage />
  },
  // {
  //   path: "/admin",
  //   element: (<ProtectedAdmin><AdminHome /></ProtectedAdmin>),
  //   // we will add a page later
  //   errorElement: <ErrorPage />
  // },
  {
    path: "/forgot-password",
    element: (<ForgotPasswordPage />),
    // we will add a page later
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: (<PageNotFound />)
  }
]);

function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUsersAsync(user.id))
    }
  } , [dispatch , user])

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* Route/Link must be made inside RouterProvider */}
    </div>
  );
}

export default App;
