import { useEffect } from "react"
import { UseStaticApiCall } from "../../../hooks/api-call"
import { DEFAULT_SERVER_URL } from "../constants"
import React from "react"
import { Avatar, Box, Button, List, ListItem, ListItemText, Typography, ListItemAvatar, Divider, ButtonBase, } from "@mui/material"
import { OrderStatus } from "../OrderStatus"
import { CardMembership, Countertops, DiningSharp, Numbers, ReplayOutlined, Upload } from "@mui/icons-material"
import './dashboard-chef.css'
import { useDispatch } from "react-redux"
import { setCurrentOrder } from "../../user-slice"
import { OrderBasic } from "./order"

export class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            page: 1,
            totalPages: 1,
            totalOrders: null,
            pagesLeft: 0
        }
    }
    listPage = async (page, type)=>{
        if(page <= this.state.totalPages && type == 'reload' ? true : this.state.page != page){
            const response = await fetch(`${DEFAULT_SERVER_URL}order/dishes/${page}${this.props.shiftId ? `?shiftId=${this.props.shiftId}` : ''}`,{
                headers:{
                    'Authorization': "Bearer " + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                  }
            })
            if (response.status == 200) {
                let orders = await response.json()
                console.log(orders)
                this.setState({ page, orders: orders.entities, 
                    totalOrders: orders.total, 
                    totalPages: orders.pages, 
                    pagesLeft: orders.pagesLeft })
            }
        }
    }

    componentDidUpdate(){
        console.log(this.state)
    }
    componentDidMount() {
        const fetchOrders = async () => {
            const response = await fetch(`${DEFAULT_SERVER_URL}order/dishes/${this.state.page}${this.props.shiftId ? `?shiftId=${this.props.shiftId}` : ''}` /* + this.props.shiftId ? `?shiftId=${this.props.shiftId}` : '' */,{
                headers:{
                    'Authorization': "Bearer " + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                  }
            })
            if (response.status == 200) {
                let orders = await response.json()
                console.log(orders)
                this.setState({ orders: orders.entities, 
                    totalOrders: orders.total, 
                    totalPages: orders.pages, 
                    pagesLeft: orders.pagesLeft })
            }
        }
        fetchOrders()
    }
    render() {
        let pages = []
        for(let i = 1;i<=this.state.totalPages;i++){
            pages.push(i)
        }
        return (
            <>
            {this.state.totalPages > 1 ? <>
                <Button size="small" variant="contained" onClick={()=>{this.listPage(this.state.page -= 1)}} disabled={this.state.page <= 1} sx={{padding:'0'}}><span>{'<'}</span></Button>
            {pages.map(page=>(
                <Button size="small" variant="contained" onClick={()=>{this.listPage(page)}} color={this.state.page == page ? 'error' : 'primary'} sx={{padding:'0'}}>{page}</Button>
            ))}
            <Button size="small" variant="contained" onClick={()=>{this.listPage(this.state.page += 1)}} disabled={this.state.totalPages <= this.state.page} sx={{padding:'0'}}><span>{'>'}</span></Button>
            <Button startIcon={<ReplayOutlined/>} variant="outlined" onClick={()=>this.listPage(this.state.page, 'reload')} size="small" sx={{marginLeft:'20px'}}>Обновить</Button>
            </> : <Button startIcon={<ReplayOutlined/>} variant="outlined" onClick={()=>this.listPage(this.state.page, 'reload')} size="small" sx={{marginLeft:'20px'}}>Обновить</Button>}
                <Box sx={{display: 'flex', justifyContent:'left',flexDirection: 'row', flexWrap:'wrap',gap: '20px', paddingLeft:'20px',paddingTop:'20px'}}>
                    
                    {this.state.orders?.length ? this.state.orders.map(order => (
                       <OrderBasic order={order}/>
                    )) : <Typography variant="h6" sx={{ color: 'white' }}>Заказов в текущей смене нет</Typography>}
                </Box>
            </>
        )
    }
}