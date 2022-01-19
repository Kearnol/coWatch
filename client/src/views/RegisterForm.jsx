import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const RegisterForm = () => {
    const history = useHistory();
    const randInt = Math.floor(Math.random()*10)
    const storage = window.sessionStorage

    const [myForm, setMyForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        prof_img: "",
        fav_team: "",
        sec_team: "",
        location: "",
        friends: [],
        wins: "",
        losses: "",
        draws: "",
        clout: "",
        rank: "",
        status_level: "FNG"
    })

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("myFormData:", myForm);
        axios.post('http://localhost:8000/api/register', myForm, {withCredentials:true} )
        .then( res => {
            console.log("newUser:", res);
            storage.setItem("id", res.data.user._id);
            storage.setItem("username", res.data.user.username);
            history.push('/chat')
        })
        .catch( err => console.log(err) )
    }

    const onChangeHandler = (e) => {
        let updatedForm = {...myForm};
        updatedForm[e.target.name] = e.target.value;
        setMyForm(updatedForm); 
    } 

    return(
        <form onSubmit={onSubmitHandler}>
            <label htmlFor="first_name">First Name:</label>
            <input type={'text'} value={myForm.first_name} name={"first_name"} onChange={onChangeHandler}></input>
            <label htmlFor="last_name">Last Name:</label>
            <input type={'text'} value={myForm.last_name} name={"last_name"} onChange={onChangeHandler}></input>
            <label htmlFor="username">Username:</label>
            <input type={'text'} value={myForm.username} name={"username"} onChange={onChangeHandler}></input>
            <label htmlFor="email">Email:</label>
            <input type={'text'} value={myForm.email} name={"email"} onChange={onChangeHandler}></input>
            <label htmlFor="password">Password:</label>
            <input type={'password'} value={myForm.password} name={"password"} onChange={onChangeHandler}></input>
            <label htmlFor="conf_pass">Confirm Password:</label>
            <input type={'password'} value={myForm.confirmPassword} name={"confirmPassword"} onChange={onChangeHandler}></input>
            <input type={"submit"} value={"Register"}/>
        </form>
    )
}

export default RegisterForm