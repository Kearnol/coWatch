import React from 'react';
import {useHistory} from 'react-router-dom';
import Button from "react-bootstrap/Button"


const EditProfileBtn = () => {
    const history = useHistory();

    return(
        <Button variant="info" className="ms-3" onClick={()=> history.push('/edit/user')}>Edit Profile</Button >
    )
}

export default EditProfileBtn