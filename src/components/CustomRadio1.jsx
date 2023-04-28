// import { ReactNode } from "react";
// import type { NextComponentType } from 'next'
import { Radio } from '@mui/material'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import { styled } from '@mui/material/styles'

const CustomRadio = styled(Radio)(({ theme }) => ({
    background: '#F0E7FE',
    color: 'transparent',
    boxShadow: theme.shadows[2],
    padding: 0,
    '&:checked': {
        background: '#F0E7FE',
        color: '#8550DA',
    },
    '&:hover': { background: '#F0E7FE', },
    '&:active': { background: '#F0E7FE99', }
}))

const CustomRadio1 = ({ ...others }) => {
    return <CustomRadio checkedIcon={<TripOriginIcon />} {...others} />
}

export default CustomRadio1;