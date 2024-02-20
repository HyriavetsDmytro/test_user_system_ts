import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';import Button from '@mui/material/Button';import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAddNewUserMutation } from '../../store/apiSlice';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/mainStore';
import { useEffect, useState } from 'react';
import { UserInfo } from '../../store/userListSlice';
import {useDispatch } from 'react-redux'
import {userListActions} from'../../store/mainStore';

interface InputData extends UserInfo{
  pin: string
}

const themeLight = createTheme({
    palette: {
      background: {
        default: "#0d47a1"
      },
      text: {
        primary: "#ffffff"
      }
    }
  });
export default function NewUserForm() {
  const navigate = useNavigate();
  const [errorOutPut,setErrorOutput] = useState('');
  const [addNewUser,{data,isSuccess,isError,error ,isLoading }] = useAddNewUserMutation();
  const role = useSelector((state:RootState) =>  state.auth.role);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(isSuccess){
      navigate("/");}
  },[isSuccess,navigate])


  const handleCancel = ()=>{
    navigate("/");
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    var searchobject  = {} as Object;
    let email =  formData.get('email') as string
    let first_name =  formData.get('firstName')as string
    let last_name =  formData.get('lastName')as string
    let pin  = formData.get('pin') 
    let date_birth = formData.get('date_birth')as string
    let errorMessage='';
    
    if(!!email && email.length!==0){
      searchobject = {...searchobject,email: email}
    }
    else{
      errorMessage +='Input email. '
    }
    if(!!first_name && first_name.length!==0){
      searchobject = {...searchobject,first_name: first_name}
    }
    else{
      errorMessage +='Input first name. '
    }
    if(!!last_name && last_name.length!==0){
      searchobject = {...searchobject,last_name: last_name}
    }
    else{
      errorMessage +='Input last name. '
    }
    if(!!pin && /^\d{4}$/.test( pin as string)){
        searchobject = {...searchobject,pin: pin}
    }
    else{
      errorMessage +='Input 4 digit pin. '
    }
    if(!!date_birth && date_birth.length!==0){
      searchobject = {...searchobject,date_birth: date_birth}
    }
    else{
      errorMessage +='Input date birth. '
    }
    searchobject = {...searchobject,role: role==='admin'?'parent':'child'}
    if(errorMessage.length===0){
      console.log(searchobject)
      await addNewUser(searchobject);
      const { pin, ...rest } = searchobject as InputData;
      dispatch(userListActions.setUserList(rest));
    }
    else{
      setErrorOutput(errorMessage);
      console.log(errorMessage)
    }
  };
  if(errorOutPut.length!==0){
    setTimeout(() => { setErrorOutput(''); }, 4000);
  }

    return (
      <ThemeProvider theme={themeLight}>
        {isError&&<span>{JSON.stringify(error)}</span>}
        {isLoading&&<span>Loading...</span>}
        {isSuccess&&<span>{JSON.stringify(data)}</span>}
        {errorOutPut.length!==0 && <span>{errorOutPut}</span>}
        <Typography variant="h6" gutterBottom>
          Add new User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="email"
              fullWidth
              autoComplete="email"
              variant="standard"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="pin"
              name="pin"
              label="Pin"
              fullWidth
              autoComplete="pin"
              variant="standard"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="date_birth"
              name="date_birth"
              label="Date of Birth"
              fullWidth
              type='date'
              variant="standard"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button  type="submit"
                    sx={{ mt: 3, ml: 1 }}
                    disabled={isSuccess||isLoading}
                  >
                   Add New user
                  </Button>
                  <Button type='button' onClick={handleCancel} disabled={isSuccess||isLoading}
                    sx={{ mt: 3, ml: 1 ,color:'red'}}
                  >
                   Cancel
                  </Button>
                </Box>
                </Box>
      </ThemeProvider>
    );
  }
  