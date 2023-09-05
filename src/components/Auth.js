import React from 'react';
import { auth, authprovider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
const cookie = new Cookies();

function Auth({ setAuth }) {
    const signInWithGoogle = async () => {
        const res = await signInWithPopup(auth, authprovider);
        cookie.set('auth-token', res.user.refreshToken);
        setAuth(res.user.refreshToken);
    }
    return (
        <Main className='d-flex justify-content-center align-items-center theme'>
            <AuthContainer className='w-40 d-flex bg-warning p-4 rounded'>
                <h2 className='text-white mb-5'>Sign In to <u>My Chatapp</u></h2>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Email</label>
                    <input type="Email" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                </div>
                <button className='btn btn-primary mb-4'>Start Chatting</button>
                <hr />
                <div className="options d-flex justify-content-center">
                <button onClick={signInWithGoogle} className='option btn mx-1 bg-light border-danger text-danger rounded-circle'><GoogleIcon/></button>
                <button className='btn mx-1 btn-dark rounded-circle option'><GitHubIcon/></button>
                <button className='btn mx-1 border-primary bg-light text-primary rounded-circle option'><FacebookIcon/></button>
                </div>
                <div className='text-center mt-3'>Hurry Up! Login to start chatting.</div>
            </AuthContainer>
        </Main>
    )
}

export default Auth
const Main = styled.div`
    height:100vh;
`
const AuthContainer = styled.div`
    flex-direction:column;
    width:30vw;
    height:60vh;
    input{
        border:none;
        outline:none;
    }
    .option{
        width:4vw;
        height:4vw;
    }
    @media only screen and (max-width: 600px) {
        width: 90vw;  
        height:65vh;      
        .option{
            width: 15vw;
            height: 15vw;
        }
    }

`
