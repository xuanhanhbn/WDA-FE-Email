import React, { useCallback, useState } from 'react'
import Stack from '@mui/material/Stack'
import { Controller, useForm } from 'react-hook-form'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import { Delete, EyeOutline, Magnify } from 'mdi-material-ui'
import { columsAllTicket, inputSearchTicket, statusTicket } from '../../constants'
import TableCommon from 'src/components/TableCommon'
import Link from 'next/link'
import Select from 'react-select'

function AllTicketList() {
  const { control, handleSubmit, setValue } = useForm()

  const [valueTicket, setValueTicket] = useState({})

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '200px',
      height: '50px'
    })
  }

  const onSubmit = data => {
    // dispatch(ticketActions.getListTicket(data))
    console.log('adat: ', data)
  }

  // tự render actions khi có thêm items mới
  const parseData = useCallback((item, field, index) => {
    if (field === 'index') {
      return index + 1
    }

    if (field === 'actions') {
      return (
        <>
          <Link href='' passHref>
            <IconButton color='secondary'>
              <EyeOutline style={{ fontSize: 18 }} />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => {
              alert('delete')
            }}
            color='error'
          >
            <Delete style={{ fontSize: 18, color: 'red' }} color='red' />
          </IconButton>
        </>
      )
    }
    if (field === 'status') {
      if (item.status === 'Not Processed') {
        return (
          <div style={{ backgroundColor: 'rgb(244 196 196)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'red', textAlign: 'center' }}>Not Processed</Typography>
          </div>
        )
      }
      if (item.status === 'In Processed') {
        return (
          <div style={{ backgroundColor: 'rgb(244 243 196)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'warning.main', textAlign: 'center' }}>In Processed</Typography>
          </div>
        )
      }
      if (item.status === 'Processed') {
        return (
          <div style={{ backgroundColor: 'rgb(205 246 215)', borderRadius: 5, paddingTop: 5, paddingBottom: 5 }}>
            <Typography sx={{ color: 'success.main', textAlign: 'center' }}>Processed</Typography>
          </div>
        )
      }
    }

    return item[field]
  }, [])

  const handleSelectChange = selectedOption => {
    const selectedValue = selectedOption
    setValue('status', selectedValue?.value, { shouldValidate: true })
    setValueTicket(selectedValue)
  }

  return (
    <div>
      {/* Search */}
      <div style={{ float: 'right', marginBottom: 15 }}>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            {inputSearchTicket.map(inputSearch => (
              <div key={`inputSearchTicket_${inputSearch.field}`}>
                <Controller
                  key={inputSearch.field}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        onChange={handleSelectChange}
                        options={statusTicket}
                        value={valueTicket}
                        isSearchable
                        className='z-2'
                        styles={customStyles}
                      />
                    )
                  }}
                  name={inputSearch.field}
                />
              </div>
            ))}
            <Button
              style={{ backgroundColor: '#9155FD', color: 'white' }}
              onClick={handleSubmit(onSubmit)}
              size='large'
              variant='contained'
            >
              <Magnify />
            </Button>
          </Stack>
        </form>
      </div>
      {/* Table */}
      <div className='table-data mt-3'>
        <TableCommon
          data={[]}
          parseFunction={parseData}
          columns={columsAllTicket}
          isShowPaging
          classNameTable='tblCampaignReport'
        />
      </div>
    </div>
  )
}

export default AllTicketList
