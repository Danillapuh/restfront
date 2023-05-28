import { Box, Button, ButtonBase, Grid } from "@mui/material";
import { SetStatus } from "../setStatus";
import { NavLayout } from "./Navlayout";
import { Orders } from "./Orders";
import { Buba, SelectUsers } from "./SelectUsers";
import './dashboard-chef.css'
import { CurrentOrderInfo } from "./orderinfo.";
import { useEffect, useRef, useState } from "react";
import { UseStaticApiCall } from "../../../hooks/api-call";
import { useSelector } from "react-redux";
import { DEFAULT_SERVER_URL } from "../constants";

export function WaiterPanel(){
   const order = useSelector(state=>state.order)
const gridRef = useRef(null)
    useEffect(()=>{
        let height = window.innerHeight;
        gridRef.current.style.height = `${height}px`
    },[gridRef])

    const addorder = async()=>{
        let resp = await fetch(`${DEFAULT_SERVER_URL}order/add`,{
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        if(resp.status == 201){
            alert('Added')
        }
    }

    return(
        <NavLayout>
            <Grid container>
            <Grid ref={gridRef} item md={2} sx={{position:'relative',transition:'0.2s',flexBasis: order ? '' : '0px !important',background:'white', maxHeight:'95vh', overflowY:'auto', overflowX:'hidden'}}>
                     <CurrentOrderInfo/>
                </Grid>
                <Grid item md={10} sx={{paddingTop:'15px'}}>
                    <Orders/>
                    <Button onClick={addorder} variant="outlined" sx={{marginTop:'20px', marginLeft:'20px'}}>Добавить заказ</Button>
                </Grid>
            </Grid>
        </NavLayout>
    )
}