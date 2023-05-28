import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { getUserfromLocalStorage } from './store/user-slice';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Routes, redirect, useNavigate } from 'react-router-dom';
import { Login } from './store/components/login';
import { ChefPanel } from './store/components/mainComponents/ChefPanel';
import { WaiterPanel } from './store/components/mainComponents/WaiterPanel';
import { AdminPanel } from './store/components/mainComponents/AdminPanel';

function App() {
  const dispath = useDispatch()
  let user = useSelector((state)=>state.user)
  let token = useSelector((state)=>state.token)
  let [u, setU] = useState(null)
  const [message, setMessage] = useState('');
  const nav = useNavigate()

  useEffect(() => {
    fetch('http://localhost:4000')
      .then(response => response.text())
      .then(data => setMessage(data));

      dispath(getUserfromLocalStorage())
      let user1 = localStorage.getItem('user')
      let token1 = localStorage.getItem('token')
      if(!user1 || token1 == null){
        nav('/login')
      }
  }, []);

  useEffect(()=>{
    if(user){
      switch (user.role.id){
        case 1:
          nav('/admin')
          break
        case 2:
          nav('/waiter')
          break
        case 3:
          nav('/chef')
          break
      }
    }
  },[token])
  return (
      <Routes>
        <Route path='admin' element={<AdminPanel/>} />
        <Route path='waiter' element={<WaiterPanel/>} />
        <Route path="chef" element={<ChefPanel/>} />
        <Route path="login" element={<Login/>} />
      </Routes>
  );
}

export default App;
