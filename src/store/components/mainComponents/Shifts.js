import React from "react";
import { DEFAULT_SERVER_URL } from "../constants";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { Orders } from "./Orders";
import { People } from "./people";

export class Shifts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            shifts: []
        }
    }

    fetchShifts = async ()=>{
        let resp = await fetch(`${DEFAULT_SERVER_URL}shift/all`)
        if(resp.status == 200 || resp.status == 201){
            this.setState({
                shifts: await resp.json()
            })
        }
    }

    componentDidMount(){
        this.fetchShifts()
    }
    render(){
        return(
            <>
                {this.state.shifts.map(shift=>(
                    <Accordion sx={{marginBottom:'15px'}}>
                        <AccordionSummary>
                            <Typography variant="h6">Смена #{shift.id} | {shift.status.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <People shiftId={shift.id} status={shift.status}/>
                          <Orders shiftId={shift.id}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </>
        )
    }
}