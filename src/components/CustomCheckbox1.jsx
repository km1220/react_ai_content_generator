// import { ReactNode } from "react";
// import type { NextComponentType } from 'next'
import { Checkbox } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import { styled } from '@mui/material/styles'

const CustomCheckBox = styled(Checkbox)(({ theme }) => ({
    background: '#F0E7FE',
    color: 'transparent',
    padding: '0.25rem',
    borderRadius: '0.5rem',
    boxShadow: theme.shadows[4],
    '&:checked': {
        background: '#F0E7FE',
        color: '#8550DA',
    },
    '&:hover': { background: '#F0E7FE', },
    '&:active': { background: '#F0E7FE99', }
}))

const CustomCheckbox1 = ({ ...others }) => {
    return <CustomCheckBox checkedIcon={<DoneIcon />} {...others} />
}

export default CustomCheckbox1;