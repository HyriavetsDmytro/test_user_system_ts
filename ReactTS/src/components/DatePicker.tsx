import React, { useCallback, useMemo } from 'react'
import { TextFieldVariants } from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import { MobileDatePicker as MuiDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { Event } from '@mui/icons-material'
import dayjs, { Dayjs } from 'dayjs'
import { InputProps } from './Input'

export interface DatePickerProps {
  disabled?: boolean
  label?: string
  name?: string
  defaultValue?: Date
  errorText?: string
  disableFuture?: boolean
  fullWidth?: boolean
  minDate?: Date
  maxDate?: Date
  value?: Date
  onChange?: (e: Date | null) => void
  onFocus?: InputProps['onFocus']
}

export const DatePicker = ({
  disabled = false,
  label,
  name,
  defaultValue,
  errorText,
  disableFuture = false,
  minDate,
  maxDate,
  onFocus,
  onChange,
  value,
}: DatePickerProps) => {
  const slotProps = useMemo(
    () => ({
      textField: {
        variant: 'filled' as TextFieldVariants,
        name: name,
        error: !!errorText,
        helperText: errorText,
        InputProps: {
          onFocus,
          endAdornment: (
            <InputAdornment position="end">
              <Event />
            </InputAdornment>
          ),
        },
      },
    }),
    [name, errorText, onFocus],
  )

  const onChangeHandler = useCallback(
    (date: Dayjs | null) => {
      if (onChange) {
        onChange(date ? date?.toDate() : null)
      }
    },
    [onChange],
  )

  return (
    <MuiDatePicker
      disabled={disabled}
      label={label}
      value={value ? dayjs(value) : undefined}
      disableFuture={disableFuture}
      defaultValue={dayjs(defaultValue)}
      slotProps={slotProps}
      minDate={minDate ? dayjs(minDate) : undefined}
      maxDate={maxDate ? dayjs(maxDate) : undefined}
      onChange={onChangeHandler}
    />
  )
}
