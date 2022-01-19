import React, {useState, useEffect} from 'react';
import LogoutBtn from './LogoutBtn';
import EditProfileBtn from './EditProfileBtn';
import ChatBtn from './ChatBtn';
import '../css/main.css';


const Header = (props) => {
    let session = window.sessionStorage;
    const [username, setUsername] = useState("");
    const {isLoggedIn} = props;
    const {toggleLoginStatus} = props

    useEffect(()=>{
        console.log(session);
        setUsername(session.getItem("username"));
    }, [isLoggedIn])

    const navButtons = 
        (<div class="flex">
            <h2>{username}</h2>
            <EditProfileBtn/>
            <ChatBtn/>
            <LogoutBtn toggleLoginStatus={toggleLoginStatus}/>
        </div>)

    const welcomeMessage = (<h2>Welcome to coWatch 📺 </h2>)
    


    return(
        <div>
            {isLoggedIn? navButtons : welcomeMessage}
        </div>
    )
}

export default Header
