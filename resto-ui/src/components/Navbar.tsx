import React from 'react'

import { Button } from '@mui/joy';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  return (
    
    <AppBar position='static' color='transparent'>
    <Toolbar sx={{ gap: 5 }}>
      <Typography variant='h6' component='h1'>
        Ciraldoe's
      </Typography>

      <Button href={'/'} variant='plain' color='warning'>
        Inicio
      </Button>

      <Button href={'/pedidos'} variant='plain' color='warning'>
        Pedidos
      </Button>

      <Button href={'/menu'} variant='plain' color='warning'>
        Menu
      </Button>        </Toolbar>
  </AppBar>
  )
}