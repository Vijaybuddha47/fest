import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store, { persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

//css
import './index.css';
import '../src/assets/style/style.css';
import '../src/assets/style/responsive.css';

//pages or components
import App from './App';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Genre from './Pages/Genre';
import ErrorPage from '../src/Pages/ErrorPage';
import Festival from '../src/Pages/Festival';
import Detail from './Pages/Detail';
import Favorite from './Pages/Favorite';
import Account from './Pages/Account';
import AccountVerify from './Pages/AccountVerify';
import ResetPassword from './Pages/ResetPassword';
import SendEmail from './Pages/SendEmail';
import ForgotPassword from './Pages/ForgotPassword';
import Search from './Pages/Search';
import MainPlayer from './Pages/MainPlayer'
import AppLoader from './components/AppLoader';
import About from './Pages/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: <AppLoader />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/genres",
        element: <Genre />,
      },
      {
        path: "/festival",
        element: <Festival />,
      },
      {
        path: "/details/:slug/:id",
        element: <Detail />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/send-email",
        element: <SendEmail />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/reset-password/:id",
        element: <ForgotPassword />,
      },
      {
        path: "/search",
        element: <Search />,
      },

    ],
  },
  {
    path: "/account-verified/:id",
    element: <AccountVerify />,
  },
  {
    path: "/:name/player/:id",
    element: <MainPlayer />,
  }
  // {
  //   path: "/reset-password/:id",
  //   element: <ForgotPassword />,
  // },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
