import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { db, auth } from '../firebase-config';
import "../styles/chat.css"
import Header from '../Header';


let msgs;

function Chat({ room, setisAuth, setroom }) {
  const msgColl = collection(db, "messages")
  let queryMsg = query(msgColl, where("room", "==", room), orderBy("createdAt"));
  const [newmsg, setnewmsg] = useState("")
  const [messages, setmessages] = useState([])

  useEffect(() => {
    const unsubscribe=onSnapshot(queryMsg, snapshot => {
      msgs=[];
      snapshot.forEach(doc => {
        msgs.push({ ...doc.data(), id: doc.id })
      });
      setmessages(msgs);
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newmsg === "") return;
    await addDoc(msgColl, {
      photo: auth.currentUser.photoURL,
      uid: auth.currentUser.uid,
      text: newmsg,
      user: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
      room,
    });
    setnewmsg("");
  }


  return (
    <div className='chatContainer w-100 d-flex ' >
      <Header room={room} setisAuth={setisAuth} setroom={setroom} auth={auth} />
      <div className="chats bg-white">
        {
          messages && messages.map(function (m) {
            let check = m.uid === auth.currentUser.uid;
            return <div className={`message my-1 w-100 ${check ? "d-flex justify-content-end" : ""}`} key={m.id}>
              <div className={`bg-${check ? "primary text-white" : "warning"} d-inline-block rounded px-3 py-1`}>
                <span className='d-block username pb-0 mb-0'><img className="profileImg" src={m.photo} alt="" />{check?"You":m.user}</span>
                <span>{m.text}</span>
              </div>
            </div>
          })
        }
      </div>
      <form className='form container-fluid p-3 bg-warning' onSubmit={handleSubmit}>
        <input type="text" placeholder='Type here...' onChange={e => setnewmsg(e.target.value)} value={newmsg} className='border px-3' />
        <button type='submit' className='btn btn-primary'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi mb-1 bi-send-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default Chat
