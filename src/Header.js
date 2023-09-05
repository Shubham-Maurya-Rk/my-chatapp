import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import Cookies from 'universal-cookie';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from 'styled-components';

const cookie = new Cookies();

function Header({ room, setisAuth, setroom, auth }) {
    const [open, setopen] = useState(false)
    const signOutUser = async () => {
        if(!window.confirm("Are you sure to sign out?"))return;
        await signOut(auth);
        cookie.remove("auth-token")
        setisAuth(false);
        setroom(false);
    }
    return (<>
        <div className="navbar bg-warning px-2 text-white d-flex align-item-center">
            <div className='d-flex h-100 align-items-center'>
                <img className="headerImg mx-2" src={auth.currentUser.photoURL} alt="" />
                <h2 className='welcome'>
                    Welcome to {room.toUpperCase()}</h2>
            </div>
            <div className="right d-flex align-items-center">
                <button className='mx-1 btn btn-danger' onClick={() => setroom(false)}>Leave Room</button>
                <button className='mr-2 btn btn-primary' onClick={signOutUser}>
                    Signout
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </button>
            </div>
            <div className='HamburgerMenu'>
                {open ? <CloseIcon onClick={()=>setopen(false)}/> : <MenuIcon className='menuIcon'  onClick={()=>setopen(true)} />}
            </div>
        </div>

        <MobileMenu className="mobile-menu d-flex align-items-center" open={open}>
                <button className='btn btn-danger' onClick={() => setroom(false)}>Leave Room</button>
                <button className='btn btn-primary' onClick={signOutUser}>
                    Signout
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </button>
            </MobileMenu>
        </>)
}

export default Header

const MobileMenu=styled.div`
    transform:translateX(${props=>props.open?"0%":"100%"});
    transition:0.3s ease-in-out;
`