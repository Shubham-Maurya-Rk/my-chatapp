import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import '../styles/chat.css'
import { auth, db } from '../firebase-config';
import { signOut } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';

const cookie = new Cookies();

function TakeRoomName({ setisAuth, setroom }) {
    const coll = collection(db, "rooms");
    const [open, setopen] = useState(true);
    const [rooms, setrooms] = useState([])
    const roominput = useRef("");

    const signOutUser = async () => {
        if (!window.confirm("Are you sure to sign out?")) return;
        await signOut(auth);
        cookie.remove("auth-token")
        setisAuth(false);
        setroom(false);
    }

    const handleSubmit = async () => {
        const room = roominput.current.value;
        setroom(room);
        await addDoc(coll, { name: room, createdAt: serverTimestamp(), createdBy: auth.currentUser.email });
    }
    useEffect(() => {
        const q = query(coll, orderBy("createdAt"));
        const r = [];
        const unsubscribe = onSnapshot(q, ss => {
            ss.forEach(doc => {
                r.push({ ...doc.data(), id: doc.id });
            })
            setrooms(r);
        })
        return () => unsubscribe();
        // eslint-disable-next-line
    }, [])
    const deleteAllMsgs = async(name) => {
        const msgColl = collection(db, "messages");
        const q = query(msgColl, where("room", "==", name));
        const data=await getDocs(q);
        data.forEach(async (data) => {
            const docRef = doc(db, "messages", data.id);
            await deleteDoc(docRef);
        })
    }
    const deleteRoom = async (id, name) => {
        if(!window.confirm(`Are you sure you want to delete room : ${name}?`))return;
        const docRef = doc(db, "rooms", id);
        await deleteDoc(docRef);
        deleteAllMsgs(name);
        setroom(false);
    }

    return (<>
        <SignoutBtn className='btn btn-sm btn-warning p-2 float-end vertical-align-center' onClick={signOutUser}>Signout
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
        </SignoutBtn>
        <AuthContainer className='d-flex justify-content-center align-items-center theme'>
            <FormContainer className='text-white px-3 pt-4 pb-3 border-bottom rounded d-flex align-items-center flex-column'>
                <h2 className="title">
                    <span className="title-word title-word-1">MY </span>
                    <span className="title-word title-word-2">CHATAPP </span>
                    {/* <span className="title-word title-word-3"> </span> */}
                    <span className="title-word title-word-4">ROOM</span>
                </h2>
                <Logo className="shadow p-4 bg-light border d-inline-block rounded-circle mb-4 scene">
                    <QuickreplyIcon className='text-warning z-axis' />
                </Logo>
                {
                    open === false ?
                        (<div className='inputs d-flex flex-column w-100'>
                            <input type="email" className="form-control mb-2 w-100" placeholder='Enter Room Name...' aria-describedby="emailHelp" ref={roominput} />
                            <button onClick={handleSubmit} className="btn btn-primary mt-1">Start <HomeIcon /></button>
                            <button onClick={() => setopen(true)} className="btn btn-primary mt-1">Rooms List <FormatListBulletedIcon /></button>
                        </div>) : <RoomList>
                            <Rooms>
                                {
                                    rooms.map(room => {
                                        return <li key={room.id} onClick={() => setroom(room.name)} className='d-flex p-2 justify-content-between'>
                                            <p className='m-0 p-0'>{room.name}</p>
                                            {room.createdBy === auth.currentUser.email && <DeleteIcon onClick={() => deleteRoom(room.id, room.name)} />}
                                        </li>
                                    })
                                }
                            </Rooms>
                            <CreateRoomBtnContainer>
                                <CreateRoomBtn className='btn btn-primary' onClick={() => setopen(false)}>+ Create Room</CreateRoomBtn>
                            </CreateRoomBtnContainer>
                        </RoomList>
                }
            </FormContainer>
        </AuthContainer>
    </>)
}

export default TakeRoomName;

const AuthContainer = styled.div`
    flex-direction:column;
    width:100vw;
    height:100vh;
    @media only screen and (max-width: 600px) {
        padding:2vh;     
    }
`
const FormContainer = styled.div`
    background-color:#f1b500;
`
const Logo = styled.div`  
  .z-axis {
    animation: z-axis-animation 1s ease-in-out 0s infinite alternate;
  }
  @keyframes z-axis-animation {
    from {transform: rotateZ(30deg)  scale(1.8);}
    to {transform: rotateZ(-0deg)  scale(1.8);}
  }
`
const SignoutBtn = styled.button`
  position:absolute;
  top:1%;
  right:1%;
`

const RoomList = styled.div`
  width:100%;
`

const CreateRoomBtn = styled.button`

`
const CreateRoomBtnContainer = styled.div`
  display:flex;
  justify-content:end;
`

const Rooms = styled.ul`
  list-style:none;
  padding:0;
  margin:0;
  max-height:25vh;
  overflow-y:auto;
  margin-bottom:5px;
  li{
    color:#f1b500;
    letter-spacing:1px;
    text-transform:uppercase;
    font-weight:600;
    background-color:white;
    padding:5px;
    margin-bottom:1px;
    cursor:pointer;
  }
`