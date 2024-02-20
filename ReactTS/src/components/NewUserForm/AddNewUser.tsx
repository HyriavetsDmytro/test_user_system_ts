import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import NewUserForm from './NewUserForm';
import { Toolbar } from '@mui/material';

export default function AddNewUser() {
  
    return (
      <>
        <Toolbar />
        <Container component="main" maxWidth="sm" sx={{ mb: 4}}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } , borderRadius:6,background:'#b3e5fc'}}>
                <NewUserForm />    
          </Paper>
          
        </Container>  

      </>
    );
  }