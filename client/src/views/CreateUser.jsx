import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const RegisterForm = () => {
    const history = useHistory();
    const [username, setUsername] = useState(new Set())
    const storage = window.sessionStorage

    const [myForm, setMyForm] = useState({
        username: "",
        fontcolor: "",
    })

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
    }

    const onChangeHandler = (e) => {
        let updatedForm = {...myForm};
        updatedForm[e.target.name] = e.target.value;
        setMyForm(updatedForm); 
    } 

    return(
        <form onSubmit={onSubmitHandler}>
            <label htmlFor="username">Who will you be chatting as for this session?:</label>
            <input type={'text'} value={myForm.username} name={"username"} onChange={onChangeHandler}></input>
            <label htmlFor="font_color">Choose your font color:</label>
            <select 
                name="font_color" 
                id="font_color"
                onSelect={onChangeHandler}>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="pink">Pink</option>
                <option value="red">Red</option>
                <option value="purple">Purple</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
            </select>
            <input type={"submit"} value={"Chat"}/>
        </form>
    )
}

export default RegisterForm