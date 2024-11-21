import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useAddNewUserMutation } from '../../store/apiSlice'
import { RootState } from '../../store/mainStore'
import { userListActions } from '../../store/mainStore'
import { FormInput } from '../FormInput'
import { useForm } from 'react-hook-form'
import { ADD_USER_VALIDATOR } from './AddUser.utils'
import { joiResolver } from '@hookform/resolvers/joi'
import { FormDatePicker } from '../FormDatePicker'

import styles from './NewUserForm.module.scss'

interface ValidUserFormData {
  date_birth: Date
  first_name: string
  last_name: string
  email: string
  pin: string
}

const themeLight = createTheme({
  palette: {
    background: {
      default: '#0d47a1',
    },
    text: {
      primary: '#000000',
    },
  },
})

const DEFAULT_VALUE = {
  date_birth: new Date(),
  first_name: '',
  last_name: '',
  email: '',
  pin: '',
}
export default function NewUserForm() {
  const navigate = useNavigate()
  const [addNewUser, { data, isSuccess, isError, error, isLoading }] =
    useAddNewUserMutation()
  const role = useSelector((state: RootState) => state.auth.role)
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...DEFAULT_VALUE,
    },
    resolver: joiResolver(ADD_USER_VALIDATOR),
    mode: 'onSubmit',
  })

  const handleCancel = () => {
    navigate('/')
  }

  const onSubmit = async (data: ValidUserFormData) => {
    await addNewUser({ ...data, role: role === 'admin' ? 'parent' : 'child' })
      .unwrap()
      .then(() => {
        const { pin, ...rest } = data
        dispatch(
          userListActions.setUserList({
            ...rest,
            date_birth: data.date_birth.toISOString(),
            role: role === 'admin' ? 'parent' : 'child',
          }),
        )
        navigate('/')
      })
  }

  return (
    <ThemeProvider theme={themeLight}>
      {isError && <span>{JSON.stringify(error)}</span>}
      {isLoading && <span>Loading...</span>}
      {isSuccess && <span>{JSON.stringify(data)}</span>}
      <Typography variant="h6" gutterBottom>
        Add new User
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.inputRow}>
            <FormInput
              name="first_name"
              label="First Name"
              control={control}
              errorText={errors?.first_name?.message as string}
            />
            <FormInput
              name="last_name"
              label="Last Name"
              control={control}
              errorText={errors?.last_name?.message as string}
            />
          </div>
          <div>
            <FormInput
              name="email"
              label="Email"
              control={control}
              errorText={errors?.email?.message as string}
            />
          </div>
          <div className={styles.inputRow}>
            <FormInput
              name="pin"
              label="PIN"
              control={control}
              errorText={errors?.pin?.message as string}
            />
            <FormDatePicker
              name="date_birth"
              label="Date of Birth"
              control={control}
            />
          </div>
        </div>
        <div className={styles.box}>
          <Button
            type="submit"
            className={styles.btn}
            disabled={isSuccess || isLoading}
          >
            Add New user
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            disabled={isSuccess || isLoading}
            className={styles.btnCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </ThemeProvider>
  )
}
