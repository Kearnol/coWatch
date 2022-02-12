import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const RegisterForm = (props) => {
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
            props.toggleLoginStatus();
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
        <Container className="w-25">
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3 text-start" controlId='firstName'>
                    <Form.Label>FirstName:</Form.Label>
                    <Form.Control type="text" name={"first_name"} value={myForm.first_name} onChange={onChangeHandler}/>
                </Form.Group>

                <Form.Group className="mb-3 text-start" controlId='lastName'>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" value={myForm.last_name} name={"last_name"}onChange={onChangeHandler}/>
                </Form.Group>

                <Form.Group className="mb-3 text-start" controlId='userName'>
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control type="text" value={myForm.username} name={"username"} onChange={onChangeHandler}/>
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="text" value={myForm.email} name={"email"} onChange={onChangeHandler}/>
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={myForm.password} name={"password"} onChange={onChangeHandler}/>
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId='confirmPass'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" value={myForm.confirmPassword} name={"confirmPassword"} onChange={onChangeHandler}/>
                </Form.Group>
                <Button variant="success" type="submit">Register</Button>
            </Form>
        </Container>
    )
}

export default RegisterForm