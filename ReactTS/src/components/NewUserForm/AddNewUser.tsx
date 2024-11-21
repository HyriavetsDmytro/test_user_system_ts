import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import NewUserForm from './NewUserForm'
import { Toolbar } from '@mui/material'

import styles from './NewUserForm.module.scss'

export default function AddNewUser() {
  return (
    <>
      <Toolbar />
      <Container component="main" maxWidth="sm" className={styles.container}>
        <Paper variant="outlined" className={styles.paper}>
          <NewUserForm />
        </Paper>
      </Container>
    </>
  )
}
