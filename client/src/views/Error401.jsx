import React from 'react';
import {useHistory} from 'react-router-dom';


const Error401 = ()=>{
    const history = useHistory();

    return(
        <div>
            <img src="" alt="" />
            <h3>Sorry, you need to be logged in to access that.</h3>
            <button onClick={()=> {history.push('/login') }}>Login</button>
        </div>
    )
}

export default Error401;