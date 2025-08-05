import { configureStore } from '@reduxjs/toolkit'
import authRedux from '../Redux/authRedux'

const store=configureStore({
    reducer:{
       counter:authRedux
    }
})


export default store