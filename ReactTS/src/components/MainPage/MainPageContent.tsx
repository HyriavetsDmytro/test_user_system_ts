import '../../App.css';
import Box from '@mui/material/Box';
import User from './User';
import Toolbar from '@mui/material/Toolbar';
import Masonry from '@mui/lab/Masonry';
import { useGetAllUsersQuery } from '../../store/apiSlice';
import {useDispatch } from 'react-redux'
import { useEffect } from 'react';
import {userListActions} from'../../store/mainStore';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/mainStore';
import Typography from '@mui/material/Typography';
const drawerWidth = '20%';
function MainPageContent() {

  const listOfUsers = useSelector((state:RootState) => state.userList);
  const dispatch = useDispatch();
  const {data:userlist={},isSuccess,isFetching,isError,error,isLoading} = useGetAllUsersQuery();

  useEffect(()=>{
 
  if (listOfUsers.length===0 && isSuccess){

    if(Object.keys(userlist).length!==0){
      Object.entries(userlist).forEach((item)=> { 
        let target = { email:'',first_name:'',last_name:'',date_birth: '',role:'' };
        dispatch(userListActions.setUserList(Object.assign(target, item[1])));
        });
      }
  }
},[isSuccess])
  return (
          <Box  sx={{ flexGrow: 1, width:`(100% - ${drawerWidth})`}}>
       <Toolbar /> 
      {isError &&<Typography variant="h5" gutterBottom align="center" color='white'>{JSON.stringify(error)}</Typography>}
      {isLoading &&<Typography variant="h5" gutterBottom align="center" color='white'>
        Fetching Data
      </Typography>}
      <Masonry columns={4}>
        { listOfUsers.length!==0&& listOfUsers.map((item)=><User key={item.email+item.role} head={item.email}/>)}
        </Masonry>
      </Box> 
  );





}

export default MainPageContent;
