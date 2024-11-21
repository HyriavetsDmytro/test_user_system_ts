import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useGetUserByParamsMutation } from '../store/apiSlice'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SearchBarlist from './SearchBarList'

const drawerWidth = '20%'

const themeLight = createTheme({
  palette: {
    background: {
      default: '#0d47a1',
    },
    text: {
      primary: '#ffffff',
    },
  },
})

export default function SearchBar() {
  const [getUserByParams, { data, isSuccess, isError, error, isLoading }] =
    useGetUserByParamsMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    var searchobject = {} as Object
    let email = formData.get('email') as string
    let first_name = formData.get('first-name') as string
    let last_name = formData.get('last-name') as string

    if (email && email.length !== 0) {
      searchobject = { ...searchobject, email: email }
    }
    if (first_name && first_name.length !== 0) {
      searchobject = { ...searchobject, first_name: first_name }
    }
    if (last_name && last_name.length !== 0) {
      searchobject = { ...searchobject, last_name: last_name }
    }
    await getUserByParams(searchobject)
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#b3e5fc',
        },
      }}
      anchor="right"
    >
      <Toolbar />
      <ThemeProvider theme={themeLight}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Typography sx={{ m: 0, color: 'white' }} variant="h4" gutterBottom>
            Search fields
          </Typography>

          <TextField
            fullWidth
            sx={{ mx: 0, my: 1 }}
            id="email-search"
            label="Email"
            name="email"
            type="search"
            variant="standard"
            autoComplete="email"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <TextField
            fullWidth
            sx={{ mx: 0, my: 1 }}
            id="first-name-search"
            label="First Name"
            name="first-name"
            type="search"
            variant="standard"
            autoComplete="first-name"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <TextField
            fullWidth
            sx={{ mx: 0, my: 1 }}
            id="last-name-search"
            label="Last Name"
            name="last-name"
            type="search"
            variant="standard"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
          />
          <Button type="submit">Search</Button>
        </Box>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{JSON.stringify(error)}</p>}
        <Box
          sx={{
            overflow: 'auto',
          }}
        >
          {isSuccess &&
            data?.map((item) => <SearchBarlist user={item} key={item.email} />)}
        </Box>
      </ThemeProvider>
    </Drawer>
  )
}
