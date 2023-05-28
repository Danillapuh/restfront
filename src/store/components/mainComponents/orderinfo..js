import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { SetStatus } from "../setStatus"
import { DishesList } from "./dishesList"
import { AddDish } from "../addDish"
import { SelectUsers } from "./SelectUsers"

export function CurrentOrderInfo({orderInf}){
    const storeOrder = useSelector((state)=>state.order)
    const user = useSelector(state=>state.user)
    let order = orderInf || storeOrder
    return(
        <>
        {order ? <>
            <List sx={{color:'#252525'}}>
                <ListItem>
                     <Typography variant="h6">Иформация о текущем заказе</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Номер" secondary={'#'+order.id}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Cтатус" secondary={<SetStatus order={storeOrder}/>}/>
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar src={order.addedBy.photo_url}>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Добавил" secondary={order.addedBy.name} />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar src={order.cookedBy ? order.cookedBy.photo_url : null}>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Приготовил/готовит" secondary={order.cookedBy ? order.cookedBy.name : 'заказ еще не принят поваром'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Блюда" secondary={ <DishesList dishes={order.dishes}/>} />
                </ListItem>
                {user.role.id == 2 ?  <ListItem>
                    <AddDish order={storeOrder}/>
                </ListItem> : ''}
            </List>
        </> : <Typography variant="h8">Заказ не выбран</Typography>}
        </>
    )
}