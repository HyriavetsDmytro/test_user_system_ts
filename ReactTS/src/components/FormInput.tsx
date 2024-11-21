import React, { FC, ReactNode } from 'react'

import { Controller } from 'react-hook-form'

import { Input } from './Input'

export interface FormInputProps {
  name: string
  label?: string
  control: any
  errorText?: string
  className?: string
  type?: string
  endAdornment?: ReactNode
}

export const FormInput: FC<FormInputProps> = ({
  name,
  label,
  errorText,
  className,
  control,
  type,
  endAdornment,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          label={label}
          className={className}
          errorText={errorText}
          type={type}
          endAdornment={endAdornment}
          {...props}
        />
      )}
    />
  )
}
