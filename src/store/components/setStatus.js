import { useSelector } from "react-redux"
import { DEFAULT_SERVER_URL } from "./constants"
import { Select, Option, MenuItem } from "@mui/material"
import { SelectChangeEvent } from "@mui/material"

export function SetStatus({order}){
    let currenttoken = useSelector((state)=>state.token)
    let currentUser = useSelector((state)=>state.user)
    let currentOrder = useSelector((state)=>state.order)
    const setStatus = async (id)=>{
        let token = currenttoken
        let resp = await fetch(`${DEFAULT_SERVER_URL}order/status`,{
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: order.id,statusId: id})
        })
        if(resp.status == 200){
           alert('ok') 
           return
        }
        return
    }
    return(
        <>
            <Select disabled={currentUser.role.id == 1} size="small" onChange={(e)=>{setStatus(e.target.value)}} value={order.status.id}>
                <MenuItem disabled={true} value={1}>Принят</MenuItem>
                <MenuItem disabled={currentUser.role.id == 2 || order.status.id > 2} value={2}>Готовится</MenuItem>
                <MenuItem disabled={currentUser.role.id == 2 || order.status.id > 3 || order.status.id == 1} value={3}>Готов</MenuItem>
                <MenuItem disabled={currentUser.role.id == 3 || order.status.id != 3} value={4}>Оплачен</MenuItem>
                <MenuItem disabled={currentUser.role.id == 3 || order.status.id != 1} value={5}>Отменен</MenuItem>
            </Select>
        </>
    )
}