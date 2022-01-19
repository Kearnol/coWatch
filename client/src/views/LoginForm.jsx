import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

const LoginForm = (props) => {
    const history = useHistory();
    const storage = window.sessionStorage
    const [errorMsg, setErrorMsg] = useState("")
    const [myForm, setMyForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("myForm Data:", myForm);
        axios.post('http://localhost:8000/api/login', myForm, {withCredentials:true})
        .then(res=>{
            console.log("res", res);
            if(res){
            storage.setItem("id", res.data.user._id);
            storage.setItem("username", res.data.user.username);
            props.toggleLoginStatus();
            setErrorMsg("");
            return(history.push('/chat'))
            }
        })
        .catch((err) => {
            console.log(err);
            setErrorMsg("Invalid username or password")
        })
    }

    const onChangeHandler = (e) => {
        let updatedForm = {...myForm};
        updatedForm[e.target.name] = e.target.value;
        setMyForm(updatedForm); 
    } 

return(
    <>
        <Container className="w-25 mt-3">
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3 text-start" controlId='userName'>
                    {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={myForm.username} name={"username"} onChange={onChangeHandler} placeholder="Enter Username" />
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={myForm.password} name={"password"} onChange={onChangeHandler} placeholder="••••••••"/>
                </Form.Group>
                <Button variant="info" type="submit">Login</Button>
            </Form>
            <Button variant="warning" className="mt-2" onClick={()=>history.push('/')}>Back</Button>
        </Container>
    </>

)

}
export default LoginForm