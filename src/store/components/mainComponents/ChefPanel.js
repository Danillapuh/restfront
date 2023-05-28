import { Box, ButtonBase, Grid } from "@mui/material";
import { SetStatus } from "../setStatus";
import { NavLayout } from "./Navlayout";
import { Orders } from "./Orders";
import { Buba, SelectUsers } from "./SelectUsers";
import './dashboard-chef.css'
import { CurrentOrderInfo } from "./orderinfo.";
import { useEffect, useRef, useState } from "react";
import { UseStaticApiCall } from "../../../hooks/api-call";
import { useSelector } from "react-redux";

export function ChefPanel(){
   const order = useSelector(state=>state.order)
const gridRef = useRef(null)
    useEffect(()=>{
        let height = window.innerHeight;
        gridRef.current.style.height = `${height}px`
    },[gridRef])

    return(
        <NavLayout>
            <Grid container>
            <Grid ref={gridRef} item md={2} sx={{position:'relative',transition:'0.2s',flexBasis: order ? '' : '0px !important',background:'white', maxHeight:'95vh', overflowY:'auto', overflowX:'hidden'}}>
                     <CurrentOrderInfo/>
                </Grid>
                <Grid item md={10} sx={{paddingTop:'15px'}}>
                    <Orders/>
                </Grid>
            </Grid>
        </NavLayout>
    )
}