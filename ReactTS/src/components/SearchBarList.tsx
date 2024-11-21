import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'

import Typography from '@mui/material/Typography'
import { UserInfo } from '../store/userListSlice'

const SearchBarlist: React.FC<{ user: UserInfo }> = (props) => {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem alignItems="flex-start" style={{ color: '#FFFFFF' }}>
        <ListItemText
          style={{ color: '#FFFFFF' }}
          primary={props.user.email + ' ' + props.user.role}
          secondary={
            <>
              <Typography
                style={{ color: '#FFFFFF' }}
                // sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                // color="text.primary"
              >
                {props.user.first_name} {props.user.last_name}
                <br />
              </Typography>
              {props.user.date_birth}
            </>
          }
        />
      </ListItem>
      <Divider />
    </List>
  )
}
export default SearchBarlist
