import { useMemo, ReactNode } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

export interface InputProps {
  inputRef?: any
  label?: string
  name?: string
  type?: string
  value?: string
  shrink?: boolean
  errorText?: string
  className?: string
  defaultValue?: string | number
  children?: ReactNode
  endAdornment?: ReactNode
  onFocus?: TextFieldProps['onFocus']
  onChange?: TextFieldProps['onChange']
  onKeyDown?: TextFieldProps['onKeyDown']
  hiddenLabel?: boolean
}

export const Input = ({
  label,
  type,
  shrink,
  errorText,
  className,
  children,
  name,
  value,
  onFocus,
  inputRef,
  onKeyDown,
  onChange,
  defaultValue,
  endAdornment,
  hiddenLabel,
  ...rest
}: InputProps) => {

  const INPUT_PROPS = useMemo(
    () => ({
      disableUnderline: true,
      endAdornment,
    }),
    [endAdornment],
  )

  const shrinkForValue = shrink || value ? Boolean(value) : undefined

  const INPUT_LABEL_PROPS = useMemo(
    () => ({
      shrink: shrinkForValue,
    }),
    [shrinkForValue],
  )

  return (
    <TextField
      fullWidth
      className={className}
      variant="filled"
      name={name}
      key={defaultValue}
      defaultValue={defaultValue}
      onFocus={onFocus}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      value={value}
      label={label}
      error={!!errorText}
      helperText={errorText}
      InputProps={INPUT_PROPS}
      InputLabelProps={INPUT_LABEL_PROPS}
      inputRef={inputRef}
      hiddenLabel={hiddenLabel}
      {...rest}
    >
      {children}
    </TextField>
  )
}
