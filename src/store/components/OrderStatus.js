import { CancelRounded, CheckCircle, Cookie, DoneAll, Money, Paid } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

export function OrderStatus({id}){
    const [status, setstatus] = useState(null)

    useEffect(()=>{
       switch (id){
        case 1:
            setstatus(<Box sx={{width:'fit-content',borderRadius: '5px',display: 'flex'}}><Typography variant="h12" sx={{color:'#03a9f4'}}>принят</Typography></Box>)
            break
         case 2:
            setstatus(<Box sx={{borderRadius: '5px',display: 'flex'}}><Typography variant="h12" sx={{color:'#009688'}}>готовится</Typography></Box>)
            break
         case 3:
            setstatus(<Box sx={{borderRadius: '5px',display: 'flex'}}><Typography variant="h12" sx={{color:'#4caf50'}}>готов</Typography></Box>)
            break
         case 4:
            setstatus(<Box sx={{borderRadius: '5px',display: 'flex'}}><Typography variant="h12" sx={{color:'#fdc409'}}>оплачен</Typography></Box>)
            break
         case 5:
            setstatus(<Box sx={{borderRadius: '5px',display: 'flex'}}><Typography variant="h12" sx={{color:'#f35a4c'}}>отменен</Typography></Box>)
            break
       } 
    },[id])
    return(
        <>{status}</>
    )
}