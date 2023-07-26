import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Select from 'react-select'
import CardActions from '@mui/material/CardActions'
import { FormControl, TextareaAutosize } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { styled } from '@mui/system'

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f'
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
}

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `

  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
)

const categoryStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '8px 0'
  })
}

function CreateTicket() {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    control,
    formState: { errors }
  } = useForm()
  const handleClose = () => onClose()
  const onSubmit = data => console.log(data)
  const [valueCategory, setValueCategory] = useState({})

  const dataCategory = [
    {
      categoryId: '1',
      name: 'Category 1'
    },
    {
      categoryId: '2',
      name: 'Category 2'
    },
    {
      categoryId: '3',
      name: 'Category 3'
    }
  ]

  const handleGetOptions = () => {
    const formattedOptions = dataCategory?.map(item => ({
      value: item?.categoryId,
      label: item?.name
    }))

    return formattedOptions
  }

  // Xử lí change Select
  const handleSelectChange = selectedOption => {
    const selectedValue = selectedOption
    setValue('ticketCategory', selectedValue?.value, { shouldValidate: true })
    setValueCategory(selectedValue)
  }

  return (
    <div>
      <FormControl style={{ width: '100%' }}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name='ticketCategory'
                  render={({ field }) => (
                    <>
                      {/* <InputLabel>{item.placeHolder}</InputLabel> */}
                      <Select
                        {...field}
                        onChange={handleSelectChange}
                        options={handleGetOptions()}
                        value={valueCategory}
                        isSearchable
                        className='z-2'
                        styles={categoryStyles}
                      />
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name='content'
                  render={({ field: { onChange, value } }) => (
                    <StyledTextarea
                      sx={{ maxHeight: 200 }}
                      fullWidth
                      required
                      multiline
                      minRows={6}
                      placeholder='Message'
                      onChange={onChange}
                      value={value}
                      type='input'
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </CardActions>
      </FormControl>
    </div>
  )
}

export default CreateTicket
