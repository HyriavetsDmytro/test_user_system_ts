import SignForm from '../components/SignPage/SignForm';
import AddNewUser from '../components/NewUserForm/AddNewUser';
import MainPage from '../components/MainPage/MainPage';
import NoPage from '../components/Nopage';
import ProtectedRoute from './ProtectedRoute';
import {  createBrowserRouter} from "react-router-dom";
import RootLayout from '../components/RootLayout/RootLayout';

  const router = createBrowserRouter([
    {path:"/", element:<RootLayout />,
  children:[
  {path:"login", element:<SignForm />},
  {path:"addnewuser", 
    element:
      <ProtectedRoute
        redirectPath="/login"
        isAllowed='rights'>
          <AddNewUser />
      </ProtectedRoute>
  },
  {path: '',
    element:
      <ProtectedRoute
      isAllowed='simple'
        redirectPath="/login"
        />,
    children: [
      {path:"", element:<MainPage />},
      {path:"*", element:<NoPage />}
      ]
      }]
}
  ])
  export default router;
  
  