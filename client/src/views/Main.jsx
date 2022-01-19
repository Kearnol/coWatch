import React from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button"
import Stack from 'react-bootstrap/Stack'

const Main = () => {
    
    return(
        <div>   
            <ul>
            <Stack className="mt-2">
                <Link to={`/register`}>
                    <Button variant="success" >Registser</Button>
                </Link>
                <Link to={`/login`}>
                    <Button className="my-1">Login</Button>
                </Link>
            </Stack>
            </ul>
        </div>
    )

}

export default Main;