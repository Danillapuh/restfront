import React from "react"
import { Avatar,List, ListItem, ListItemText, ListItemAvatar, ButtonBase, } from "@mui/material"
import { OrderStatus } from "../OrderStatus"
import { CardMembership, Countertops, Numbers } from "@mui/icons-material"
import './dashboard-chef.css'
import { useDispatch, useSelector } from "react-redux"
import { setCurrentOrder } from "../../user-slice"
import { Order } from "./order"

export function OrderBasic({ order }) {
    const dispatch = useDispatch()
    let user = useSelector((state)=>state.user)
    return (
        <ButtonBase onClick={()=>{dispatch(setCurrentOrder(order))}}>
            <List sx={{border: user.id == order.addedBy.id || user.id == order.cookedBy?.id ? '1px solid #d41648' : '',borderRadius: '25px', boxShadow: '19px 20px 20px 0px rgb(113 122 150 / 14%)', width: 'fit-content', maxWidth: 360, bgcolor: 'white', color: '#101010'}}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ background: 'linear-gradient(157deg, rgb(115 115 155) 0%, rgba(54,63,71,1) 100%)' }}>
                            <Numbers />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Номер заказа" secondary={order.id} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ background: 'linear-gradient(157deg, rgb(115 115 155) 0%, rgba(54,63,71,1) 100%)' }}>
                            <CardMembership />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Статус" secondary={<OrderStatus id={order.status.id} />} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ background: 'linear-gradient(157deg, rgb(115 115 155) 0%, rgba(54,63,71,1) 100%)' }}>
                            <Countertops />
                        </Avatar >
                    </ListItemAvatar>
                    <ListItemText primary="Количество блюд" secondary={order.dishes.length} />
                </ListItem>
            </List>
        </ButtonBase>
    )
}