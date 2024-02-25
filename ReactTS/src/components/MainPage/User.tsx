import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from './User.module.css'
import { useGetUserByParamsMutation } from '../../store/apiSlice';

import { useSelector } from 'react-redux'
import { RootState } from '../../store/mainStore';
import {useDispatch } from 'react-redux'
import { useEffect } from 'react';

import {userListActions} from'../../store/mainStore';

const User:React.FC<{head: string}>=(props)=> {
  const[isExpand,setIsExpand]=React.useState(false);
  const listOfUsers = useSelector((state:RootState) => state.userList);
  const index = listOfUsers.findIndex(item=> item.email===props.head);
  const dispatch = useDispatch();
  const [getUserByParams,{data ,isSuccess,isError,error ,isLoading }] = useGetUserByParamsMutation();
  const isFull= listOfUsers[index].first_name.length;


  useEffect(()=>{
    
    if(isSuccess&& data){
      dispatch(userListActions.updUserByEmail(data));
    }
  },[data,isSuccess])

const getInfo =async()=>{
  if(isFull===0){
     await getUserByParams({email:props.head});
  }

}
useEffect(()=>{
  if(isExpand){
    if(isFull===0){
    getInfo()}
  }},[isExpand,isFull]);

    

   return (
    <div className={classes.cont}>
      <Accordion onChange = {(e,expanded) => {
        if(expanded){
          setIsExpand(true)
        }else{
          setIsExpand(false)
        }
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id={"panel1-header"}>
         {!isExpand&&<>{listOfUsers[index].email} <span className={classes.conter}> {listOfUsers[index].role}</span></> }  
        {isExpand&&!isLoading&&!isError&&<>Click to shink info</>}
        {isLoading&&<p>Loading...</p>}
      </AccordionSummary> 
        <AccordionDetails>
        {isFull!==0 &&Object.entries(listOfUsers[index]).map( ([key, val]) => <p key={key+val}>{key}: {val}</p>)} 
        {isError&& <p>{JSON.stringify(error)}</p>}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default User;
