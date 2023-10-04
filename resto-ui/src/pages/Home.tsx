import { Grid } from '@mui/joy'
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Typography } from '@mui/material'

const Home = () => {
  return (
    <MainLayout>
      <Grid padding={10}>
        <Typography variant='body1' fontSize={22}>Ciraldoe's</Typography>
        <Typography variant='h1' fontSize={50} component={'h2'}>Pastas de Gran Calidad</Typography>
      </Grid>
    </MainLayout>
  )
}

export default Home