import { ExitToApp } from "@mui/icons-material"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function NavLayout({ children }) {
    const nav = useNavigate()
    let user = useSelector((state)=>state.user)
    return (
        <>
            <Box sx={{padding:'0px 10px',boxShadow:'-2px -16px 6px 19px rgb(23 33 64 / 20%);',background: 'white',alignItems:'center',display: 'flex',zIndex:'10000000',minHeight: '50px',justifyContent:'space-between'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src="https://img.icons8.com/?size=1x&id=XUSAtrssXmLj&format=png" width={46} height={46}></img>
                    <Typography variant="h6" sx={{color: 'black', textTransform:'uppercase'}}>Tortotoro</Typography>
                </Box>
               <Box sx={{padding:'0px', display:'flex', alignItems:'center'}}>
                <Box sx={{display:'flex', gap:'10px', alignItems:'center', paddingRight:'30px'}}>
                 <Avatar src={user?.photo_url}/>
                 <Typography variant="h10">{user?.name}</Typography>
                </Box>
               <Button size="small" sx={{height:'25px'}} variant="contained" startIcon={<ExitToApp/>} color="error" onClick={()=>{
                    localStorage.clear()
                    nav('/login')
                }}>Выйти</Button>
               </Box>
            </Box>
            {children}
        </>
    )
}