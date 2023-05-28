import { List,ListItem,Avatar,ListItemAvatar,ListItemText, Button } from "@mui/material";
import { DEFAULT_SERVER_URL } from "../constants";
import { useDispatch } from "react-redux";
import { deleteDish } from "../../user-slice";

export function DishesList({dishes}){
    const dispatch = useDispatch()


    const deleteDish = async (dishId)=>{
        let resp = await fetch(`${DEFAULT_SERVER_URL}order/dish/delete/${dishId}`, {
            method:'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        if(resp.status >= 200 && resp.status <210){
            let a = resp.text()
            dispatch(deleteDish(dishId))
            return
        }
        return
    }
    return(
        <>
            <List>
               {/*  <ListItem>
                 <ListItemText primary="Блюда в заказе"/>
                </ListItem> */}
                {dishes.length ? dishes.map(dishinfo=>(
                     <ListItem>
                        <Button size="small" onClick={()=>deleteDish(dishinfo.id)}>del</Button>
                     <ListItemAvatar>
                             <Avatar sizes="small" src={dishinfo.dish.image_url}>
                             </Avatar>
                         </ListItemAvatar>
                         <ListItemText primary={dishinfo.dish.name} secondary={`Количество: ${dishinfo.amount}`} />
                     </ListItem>
                )): 'Блюда еще не добавлены в заказ'}
            </List>
        </>
    )
}