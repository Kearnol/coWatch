import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Button from "react-bootstrap/Button"



const LogoutBtn = (props) => {
    const history = useHistory();
    const {toggleLoginStatus} = props

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
        .then(window.sessionStorage.clear())
        .then(()=>{return(
            toggleLoginStatus(),
            history.push('/login')
        )

        })
        .catch(err=>console.log(err))
    };

    return(
        <Button variant='info' onClick={logout}>Logout</Button>
    )
}

export default LogoutBtn