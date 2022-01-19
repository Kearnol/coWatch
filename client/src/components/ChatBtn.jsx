import React from 'react';
import {useHistory} from 'react-router-dom';
import Button from "react-bootstrap/Button"



const MainBtn = () => {
    const history = useHistory();

    return(
        <Button variant='info' className="mx-3" onClick={()=>history.push('/chat')}>Chat</Button>
    )
}

export default MainBtn