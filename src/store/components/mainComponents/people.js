import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { DEFAULT_SERVER_URL } from "../constants";

export function People({shiftId, status}){
    const [people, setpeople] = useState([])

    const fetchUsers = async ()=>{
        let resp = await fetch(`${DEFAULT_SERVER_URL}shift/${shiftId}`)
        if(resp.status == 200 || resp.status == 201){
            let info = await resp.json()
           setpeople(info.users)
        }
    }

    const deleteUser = async (userId)=>{
        let resp = await fetch(`${DEFAULT_SERVER_URL}shift/deleteUsers`,{
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({shiftId, users:[userId]})
        })
        if(resp.status == 200 || resp.status == 201){
            let users = people.filter((man)=>man.id != userId)
           setpeople(users)
        }
    }
    useEffect(()=>{
        fetchUsers()
    },[])

    return(
        <List sx={{display:'flex', flexWrap:'wrap'}}>
            {people.map(man=>(
                <ListItem>
                    <Button sx={{marginRight:'15px'}} variant="outlined" disabled={status.id == 3} color="error" onClick={()=>deleteUser(man.id)}>Снять со смены</Button>
                <ListItemAvatar>
                    <Avatar src={man.photo_url}/>
                </ListItemAvatar>
                <ListItemText primary={man.name} secondary="Job status"/>
            </ListItem>
            ))}
        </List>
    )
}