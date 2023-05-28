import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        user: null,
        order: null
    },
    reducers:{
        getUserfromLocalStorage(state){
            state.token = localStorage.getItem('token');
            state.user = JSON.parse(localStorage.getItem('user'))
            
        },
        setUser(state, action){
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload
            
        },
        setToken(state, action){
            localStorage.setItem('token', action.payload)
            state.token = action.payload.replaceAll('"', '')
            
        },
        setCurrentOrder(state, action){
            state.order = action.payload
            
        },
        adddish(state, action){
            state.order.dishes.push(action.payload)
            
        },
        deleteDish(state, action){
            state.order.dishes.filter(dish=>dish.id != action.payload)
            
        }
    }
})
export const { getUserfromLocalStorage, setUser, setToken, setCurrentOrder,adddish, deleteDish } = userSlice.actions
export const userReduser = userSlice.reducer