import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import {useDispatch } from 'react-redux'
import {userAuthActions} from'../../store/mainStore';
import { useNavigate } from "react-router-dom";
import NoPage from '../Nopage';
import { useLoginMutation,useRegisterMutation } from '../../store/apiSlice';
import { useEffect,useState} from 'react';

const themeCustom = createTheme({
    palette: {
      background: {
        default: "#0d47a1"
      },
      text: {
        primary: "#ffffff"
      },
      },
  });

export default function SignForm() {
  const [isRegist,setIsRegist]=React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login,{data: loginData,isSuccess:isSuccessLogin,isError:isErrorLogin,error: errorLogin,isLoading: isLoadingLogin}] = useLoginMutation();
  const [register,{data: registData,isSuccess:isSuccessRegister,isError:isErrorRegister,error: errorRegister,isLoading: isLoadingRegister}] = useRegisterMutation();
  const [errorOutPut,setErrorOutput] = useState('');
  useEffect(()=>{
    if(isSuccessLogin){
      dispatch(userAuthActions.logIn({email: loginData.email,token: loginData.token,role:loginData.role}));
      localStorage.setItem('authUser', JSON.stringify({email: loginData.email,token: loginData.token,role:loginData.role, time: new Date().setTime(new Date().getTime() + 60 * 60 * 1000)}));
      navigate("/");
      }
    if(isSuccessRegister){
      dispatch(userAuthActions.logIn({email: registData.email,token: registData.token,role:registData.role}));
      localStorage.setItem('authUser', JSON.stringify({email: registData.email,token: registData.token,role:registData.role, time: new Date().setTime(new Date().getTime() + 60 * 60 * 1000)}));
      navigate("/");
      }
},[isSuccessLogin,isSuccessRegister])

  const authLocal = localStorage.getItem('authUser');
  if (!!authLocal)
  {
    return <NoPage/>;
  }


  const  handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if(isRegist){
      let email = formData.get('email') as string ;
      let password =  formData.get('password')
      if(!!email&&!!password){
      await login({email: email,password: password})
    }
    else{
      setErrorOutput('Input all fields')
    }
      
    }
    else{
      let email = formData.get('email')  as string;
      let password =  formData.get('password');
      let pin =  formData.get('pin')
      if(!!email&&!!password&&!!pin){
      await register({email: email,
      password: password,pin:pin})}
      else{
        setErrorOutput('Input all fields');
      }
    }
  };
  if(errorOutPut.length!==0){
    setTimeout(() => { setErrorOutput(''); }, 4000);
  }
 
 

  function toggleClick(){
    setIsRegist(prev=>!prev);
  }

  return (
    <>
    <ThemeProvider theme={themeCustom}>
    <Toolbar />
    
      <Container component="main" maxWidth="xs"sx={{background:'#b3e5fc', borderRadius: 6}}>
        <CssBaseline />
        <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={toggleClick}
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoadingLogin||isLoadingRegister}
            >
              Click if you here to {!isRegist?'Login':'Register'}
            </Button>
            {isErrorLogin&&<span>{JSON.stringify(errorLogin)}</span>}
            {isErrorRegister&&<span>{JSON.stringify(errorRegister)}</span>}
            {errorOutPut.length!==0&&<span>{errorOutPut}</span>}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography component="h1" variant="h5">
            User Managment System
          </Typography>
          <Typography component="h2" variant="h5">
            {isRegist?'Login':'Register'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, }}>
            <TextField
              margin="normal"
              type='string'
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            {!isRegist&&  <TextField
              margin="normal"
              required
              fullWidth
              name="pin"
              label="Pin"
              type="password"
              id="pin"
              autoComplete="current-pin"
            />}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoadingLogin|| isLoadingRegister}
            >
              {isRegist?'Login':'Register'}
            </Button>
          </Box>
        </Box>
      </Container>
      </ThemeProvider>
      </>
  );
}




