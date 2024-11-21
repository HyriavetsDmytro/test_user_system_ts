import React, { FC } from 'react'

import { Controller } from 'react-hook-form'

import { DatePicker } from './DatePicker'

interface FormInputProps {
  name: string
  label?: string
  control: any
  maxDate?: Date
  errorText?: string
  disableFuture?: boolean
  disabled?: boolean
}

export const FormDatePicker: FC<FormInputProps> = ({
  name,
  label,
  control,
  maxDate,
  errorText,
  disableFuture = false,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name } }) => (
        <DatePicker
          onChange={onChange}
          value={value}
          name={name}
          label={label}
          maxDate={maxDate}
          errorText={errorText}
          disableFuture={disableFuture}
          disabled={disabled}
        />
      )}
    />
  )
}
