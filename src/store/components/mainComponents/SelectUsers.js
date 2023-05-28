import React from "react";
import { DEFAULT_SERVER_URL } from "../constants";
import { Avatar, Box, Button, ButtonBase, Divider, Typography } from "@mui/material";

export class SelectUsers extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            usersAll: [],
            selectedUsers: [],
            isclosed: true
        }
    }
    addToList = (id)=>{
        let users = [...this.state.selectedUsers]
        if(users.indexOf(id) != -1){
            users = users.filter(userId=>userId != id)
            this.setState({selectedUsers: users})
            return
        }
        users.push(id)
        this.setState({selectedUsers: users})
    }
    componentDidUpdate(){
        this.props.onUpdate(this.state.selectedUsers)
    }
    componentDidMount(){
        const fetchUsers = async ()=>{
            let resp = await fetch(`${DEFAULT_SERVER_URL}user/all`)
            if(resp.status == 200){
                /* console.log(await resp.json()) */
                this.setState({usersAll: await resp.json()})
            }
        }
        fetchUsers()
    }
    render(){
        const {isclosed} = this.state
        return(
           <>
            <Box sx={{position: 'relative'}}>
                <Button variant="outlined" onClick={()=>{this.setState({isclosed: !isclosed})}}>Выбрать пользователей</Button>
                <Box sx={{background:'#a5a5a538',boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',backdropFilter:'blur(100px)',width:'fit-content',padding:'5px',borderRadius:'5px',flexDirection:'column',display: isclosed ? 'none': 'flex',position: 'absolute',zIndex:'100000', left:'0', top:'100%'}}>
                    {this.state.usersAll.map(user=>(
                       <ButtonBase onClick={()=>{this.addToList(user.id)}} sx={{background: this.state.selectedUsers.indexOf(user.id) ==-1 ? '' : '#ffffff',borderRadius:'5px',transition:'0.3s',padding: '5px',marginBottom:'5px',display: 'flex',justifyContent:'left',gap: '7px', '&:hover':{transform:'translateX(10px)',background:'white'} }}>
                            <Avatar src={user.photo_url}/>
                            <Typography variant="h8" sx={{color:'black'}}>{user.name}</Typography>
                            <span style={{display:'inline-block',width:'5px', borderRadius:'50%',height:'5px',background:'black'}}></span>
                            <Typography variant="h10" sx={{color:'black', display: 'flex', alignItems:'center'}}>{user.role.name}</Typography>
                       </ButtonBase>
                    ))}
                </Box>
            </Box>
           </>
        )
    }
}
