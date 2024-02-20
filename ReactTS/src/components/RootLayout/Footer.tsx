import classes from './Footer.module.css'
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';


function Footer() {
  const location = useLocation();
  if(location.pathname!=='/'){
    return (
      <Typography  className={classes.elem}   variant="body2"  >
        {'Copyright © '}
        <Link to='/' >
          User Managment System
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );}
    else{
      return <></>;
    }
  }

export default Footer;
