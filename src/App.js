import './App.css';
import React,{useState} from 'react';
import Auth from './components/Auth';
import TakeRoomName from './components/TakeRoomName';
import Chat from './components/Chat';
import Cookies from 'universal-cookie';

const cookie=new Cookies();

function App() {
  const [isAuth, setisAuth] = useState(cookie.get('auth-token'));
  const [room, setroom] = useState(false);

  if(!isAuth){
    return (
      <Auth setAuth={setisAuth}/>
    );
  }
  return (<>{room===false?(
      <TakeRoomName setroom={setroom} setisAuth={setisAuth}/>
    ):(
      <Chat room={room} setisAuth={setisAuth} setroom={setroom}/>
    )}
  </>);
}

export default App;
