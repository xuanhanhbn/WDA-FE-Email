import { AccountCircle, EmailOutline, MapMarkerOutline, PhoneInTalk } from 'mdi-material-ui'

export const inputCustomer = [
  {
    field: 'name',
    label: 'Name',
    inputLabel: 'Customer Name: ',
    value: 'Tống Minh Dương',
    icon: <AccountCircle />
  },
  {
    field: 'email',
    label: 'Email',
    inputLabel: 'Customer Email: ',
    value: 'email@gmail.com',
    icon: <EmailOutline />
  },
  {
    field: 'telephone',
    label: 'Phone',
    inputLabel: 'Customer Phone: ',
    value: '0000000',
    icon: <PhoneInTalk />
  },
  {
    field: 'address',
    label: 'Adress',
    inputLabel: 'Customer Adress: ',
    value: 'Thanh Hóa',
    icon: <MapMarkerOutline />
  }
]
