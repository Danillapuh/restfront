import { useDispatch, useSelector } from "react-redux"
import { DEFAULT_SERVER_URL } from "./constants"
import { Select, Option, MenuItem, Button, Input, Box, Typography } from "@mui/material"
import { SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import { setCurrentOrder, adddish } from "../user-slice"

export function AddDish({order}){
    const [dishes, setDishes] = useState([])
    const [amount, setAmount] = useState(null)
    const [dish, setDish] = useState(null)
    let currenttoken = useSelector((state)=>state.token)
    let currentUser = useSelector((state)=>state.user)
    let currentOrder = useSelector((state)=>state.order)
    let dispatch = useDispatch()
    order = useSelector((state)=>state.order)
    
    useEffect(()=>{
        const getDishes = async()=>{
            let resp = await fetch(`${DEFAULT_SERVER_URL}order/allDishes`);
            if(resp.status == 200 || resp.status == 201){
                setDishes(await resp.json())
            }
        }
        getDishes()
    },[])
    const addDishToOrder = async ()=>{
        let token = currenttoken
        let resp = await fetch(`${DEFAULT_SERVER_URL}order/addDish`,{
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({orderId: order.id,dishId: dish, amount})
        })
        if(resp.status >200 && resp.status <210){
           let dish = await resp.json()
           dispatch(adddish(dish))
           return
        }
        return
    }
    return(
        <>
            <Box sx={{display:'flex', flexDirection:'column',gap:'15px'}}>
                <Typography variant="h6">Добавить блюдо</Typography>
                <Select disabled={order.status.id > 1} size="small" onChange={(e)=>{setDish(e.target.value)}} placeholder="Блюдо">
                    {dishes.map(dish=>(
                        <MenuItem value={dish.id}>{dish.name}</MenuItem>
                    ))}
                </Select>
                <Input sx={{background:'#eeeeee'}} disabled={order.status.id > 1} size="small" type="number" onChange={(e)=>{setAmount(e.target.value)}} placeholder="Количество"></Input>
                <Button disabled={!(dish && amount) || order.status.id > 1} onClick={addDishToOrder} variant="outlined">Добавить</Button>
            </Box>
        </>
    )
}