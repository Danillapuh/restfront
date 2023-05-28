import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_SERVER_URL } from "./constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../user-slice";
import { TinyAlert } from "./AlertTimeout";
import { ExitToAppSharp } from "@mui/icons-material";

export function Login() {
    const [alertClosed, setalertClosed] = useState(true)
    let login = useRef(null)
    let password = useRef(null)
    const [loginError, setLoginerror] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const sendLogin = async () => {
        setIsLoading(true)
        console.log(password.current.value + ' ' + login.current.value);
        let resp = await fetch(`${DEFAULT_SERVER_URL}auth/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ password: password.current.value, login: login.current.value })
        })
        if (resp.status == 201) {
            let userInfo = await resp.json()
            dispatch(setToken(userInfo.token))
            dispatch(setUser(userInfo.user))
            setIsLoading(false)
            navigate('/')
            return
        }
        login.current.value = ''
        password.current.value = ''
        setLoginerror(true)
        setIsLoading(false)
    }
    return (
        <>
            <Box sx={{ display: 'block', width: 'fit-content', margin: '30vh auto', padding: '20px' }}>
                <Box sx={{ display: 'flex', marginBottom: '20px', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <img src="https://img.icons8.com/?size=512&id=67956&format=png" width={64} height={64}></img>
                    <Typography variant="h3">Tortotoro</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <TextField
                        variant="filled"
                        required
                        id="outlined-required"
                        label="Логин"
                        placeholder="Ваш логин"
                        inputRef={login}
                        error={loginError}
                    />
                    <TextField
                        type="password"
                        variant="filled"
                        required
                        id="outlined-required"
                        label="Пароль"
                        placeholder="Ваш пароль"
                        inputRef={password}
                        error={loginError}
                    />
                </Box>
                <Button color={loginError ? 'error' : 'primary'} startIcon={<ExitToAppSharp/>} disabled={isLoading} onClick={sendLogin} variant="contained" fullWidth sx={{ marginTop: '10px' }}>
                    Войти
                </Button>
            </Box>
            {/* <TinyAlert title={'alert'} closed={alertClosed} timeToClose={3500} />
            <Button onClick={()=>{setalertClosed(!alertClosed)}}>alert</Button> */}
        </>
    )
}