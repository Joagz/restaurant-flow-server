import { Grid } from '@mui/joy'
import React from 'react'
import Navbar from '../components/Navbar'

type Props = {
    children?: JSX.Element[] | JSX.Element
}

function MainLayout({children}: Props) {
  return (
    <Grid xs={12}>
        <Navbar></Navbar>
        {children}
    </Grid>
  )
}

export default MainLayout