import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { useDispatch } from 'react-redux'
import { userAuthActions } from '../../store/mainStore'
import { useNavigate } from 'react-router-dom'
import NoPage from '../Nopage'
import { useLoginMutation, useRegisterMutation } from '../../store/apiSlice'

import styles from './SignForm.module.scss'
import { useForm } from 'react-hook-form'
import { AuthUserValidator } from './SignForm.utils'
import { joiResolver } from '@hookform/resolvers/joi'
import { FormInput } from '../../components/FormInput'

interface ValidAuthFormData {
  email: string
  password: string
  pin: string
}

const themeCustom = createTheme({
  palette: {
    background: {
      default: '#0d47a1',
    },
    text: {
      primary: '#ffffff',
    },
  },
})

export default function SignForm() {
  const [isRegist, setIsRegist] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [
    login,
    { isError: isErrorLogin, error: errorLogin, isLoading: isLoadingLogin },
  ] = useLoginMutation()
  const [
    register,
    {
      isError: isErrorRegister,
      error: errorRegister,
      isLoading: isLoadingRegister,
    },
  ] = useRegisterMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidAuthFormData>({
    defaultValues: {
      email: '',
      password: '',
      pin: '',
    },
    resolver: joiResolver(AuthUserValidator(isRegist)),
    mode: 'onSubmit',
  })
  React.useEffect(() => {
    reset()
  }, [isRegist, reset])
  const authLocal = localStorage.getItem('authUser')
  if (!!authLocal) {
    return <NoPage />
  }

  const onSubmit = async (data: ValidAuthFormData) => {
    if (isRegist) {
      await login({ email: data.email, password: data.password })
        .unwrap()
        .then((loginData) => {
          dispatch(
            userAuthActions.logIn({
              email: loginData.email,
              token: loginData.token,
              role: loginData.role,
            }),
          )
          localStorage.setItem(
            'authUser',
            JSON.stringify({
              email: loginData.email,
              token: loginData.token,
              role: loginData.role,
              time: new Date().setTime(new Date().getTime() + 60 * 60 * 1000),
            }),
          )
          navigate('/')
        })
    } else {
      await register({
        email: data.email,
        password: data.password,
        pin: data.pin,
      })
        .unwrap()
        .then((registData) => {
          dispatch(
            userAuthActions.logIn({
              email: registData.email,
              token: registData.token,
              role: registData.role,
            }),
          )
          localStorage.setItem(
            'authUser',
            JSON.stringify({
              email: registData.email,
              token: registData.token,
              role: registData.role,
              time: new Date().setTime(new Date().getTime() + 60 * 60 * 1000),
            }),
          )
          navigate('/')
        })
    }
  }

  function toggleClick() {
    setIsRegist((prev) => !prev)
  }

  return (
    <>
      <ThemeProvider theme={themeCustom}>
        <Toolbar />

        <Container component="main" maxWidth="xs" className={styles.container}>
          <CssBaseline />
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={toggleClick}
            className={styles.btn}
            disabled={isLoadingLogin || isLoadingRegister}
          >
            Click if you here to {!isRegist ? 'Login' : 'Register'}
          </Button>
          {isErrorLogin && <span>{JSON.stringify(errorLogin)}</span>}
          {isErrorRegister && <span>{JSON.stringify(errorRegister)}</span>}
          <Box className={styles.box}>
            <Typography component="h1" variant="h5">
              User Managment System
            </Typography>
            <Typography component="h2" variant="h5">
              {isRegist ? 'Login' : 'Register'}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.box}>
              <div className={styles.input}>
                <FormInput
                  name="email"
                  label="Email"
                  control={control}
                  errorText={errors?.email?.message as string}
                />
                {!isRegist && (
                  <FormInput
                    name="pin"
                    label="Pin"
                    control={control}
                    errorText={errors?.pin?.message as string}
                  />
                )}
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  control={control}
                  errorText={errors?.password?.message as string}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={styles.btn}
                disabled={isLoadingLogin || isLoadingRegister}
              >
                {isRegist ? 'Login' : 'Register'}
              </Button>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
