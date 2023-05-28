import { useRef, useState } from "react"
import { SelectUsers } from "./SelectUsers"
import { Button } from "@mui/material"
import { DEFAULT_SERVER_URL } from "../constants"
import {Box} from "@mui/material"

export function AddShift(){
    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)
    const [users, setusers] = useState([])
    const dateEndRef = useRef(null)


    const addShift = async ()=>{
        let resp = await fetch(`${DEFAULT_SERVER_URL}shift/add`, {
            method:'POST',
            body: JSON.stringify({dateStart, dateEnd, users}),
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        if(resp.status >= 200 && resp.status <= 210){
            alert('A new shift has been created')
        }

    }

    return(
        <>  
           <Box sx={{display:'flex', gap:'5px', marginBottom:'10px'}}>
           <input className="time-picker" type="datetime-local"
            onChange={(e)=>{setDateStart(e.target.value); dateEndRef.current.value =''}}
       name="meeting-time" 
       min={new Date().toISOString().slice(0, 16)}></input>

        <input className="time-picker" type="datetime-local"
            onChange={(e)=>setDateEnd(e.target.value)}
       name="meeting-time1" 
       ref={dateEndRef}
       disabled={dateStart == null}
       min={dateStart}></input>
       <SelectUsers onUpdate={(users)=>{setusers(users)}}/>
       <Button variant="contained" onClick={addShift} disabled={!dateEnd || !dateStart || !users.length}>Добавить</Button>
           </Box>
        </>
    )
}