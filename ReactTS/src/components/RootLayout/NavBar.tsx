import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';
import { useSelector,useDispatch } from 'react-redux'
import { RootState, userListActions } from '../../store/mainStore';
import {userAuthActions} from'../../store/mainStore';


export default function NavBar() {

  const email = useSelector((state:RootState) => state.auth.email)
  const role = useSelector((state:RootState) => state.auth.role)
  const isAuth = useSelector((state:RootState) => state.auth.isAuth)
  const dispatch = useDispatch();



  
  function clickLogOut(){
    dispatch(userListActions.logOut());
    localStorage.removeItem('authUser');
    dispatch(userAuthActions.logOut());

  }
  return (
       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        
        <Toolbar > 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           User Managment System  {isAuth && <span>: {email}; Role: {role}</span>} 
          
          </Typography>
          <ul className={classes.list}>
          {isAuth&& <NavLink to='/'className={({isActive})=>isActive?classes.active:undefined} end>Main Page</NavLink>}
          {isAuth&& !role.includes('child')&& <NavLink  to='/addnewuser'className={({isActive})=>isActive?classes.active:undefined}>Add New User</NavLink>}
          {!isAuth&&<NavLink  to='/login' className={({isActive})=>isActive?classes.active:undefined}>Login</NavLink>}
          {isAuth&&<NavLink  to='/login' className={({isActive})=>isActive?classes.active:undefined} onClick={clickLogOut}>Log out</NavLink>}
          
          </ul>
        </Toolbar>
      </AppBar>
  );
}