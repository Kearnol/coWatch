import React, {useEffect, useState} from 'react';
import axios from 'axios';

const EditProfile = () => {
    const storage = window.sessionStorage
    const [id] = useState(storage.getItem("id"))
    const [user, setUser] = useState()

    useEffect(()=>{
        let ID = {id: id}
        axios.post('http://localhost:8000/api/find/user', ID, {withCredentials:true} )
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }, [id])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("myFormData:", user);
        axios.post('http://localhost:8000/api/users', user, {withCredentials:true})
        .then( updatedUser => console.log("Updated User:", updatedUser) )
        .catch( err => console.log(err) )
    }

    const onChangeHandler = (e) => {
        let updatedUser = {...user};
        updatedUser[e.target.name] = e.target.value;
        setUser(updatedUser); 
    } 

    return(
        <>
        {user?
            (
            <>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="first_name">First Name:</label>
                <input type={'text'} value={user.first_name} name={"first_name"} onChange={onChangeHandler}></input>
                <label htmlFor="last_name">Last Name:</label>
                <input type={'text'} value={user.last_name} name={"last_name"} onChange={onChangeHandler}></input>
                <label htmlFor="username">Username:</label>
                <input type={'text'} value={user.username} name={"username"} onChange={onChangeHandler}></input>
                <label htmlFor="email">Email:</label>
                <input type={'text'} value={user.email} name={"email"} onChange={onChangeHandler}></input>
                <label htmlFor="fav_team">Favorite Team:</label>
                <input type="text" value={user.fav_team} name={"fav_team"} onChange={onChangeHandler}/>
                <label htmlFor="sec_team">Secondary Team:</label>
                <input type="text" value={user.sec_team} name={"sec_team"} onChange={onChangeHandler}/>
                
                <input type={"submit"} value={"Update"}/>
            </form>
            <table>
                <tbody>
                    <tr>
                        <th>Wins:</th><td>{user.wins}</td>
                    </tr>
                    <tr>
                        <th>Losses:</th><td>{user.losses}</td>
                    </tr>
                    <tr>
                        <th>Draws:</th><td>{user.draws}</td>
                    </tr>
                    <tr>
                        <th>Clout:</th><td>{user.clout}</td>
                    </tr>
                    <tr>
                        <th>Overall Rank:</th><td>{user.rank}</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <th>Status:</th><td>{user.status_level}</td>
                    </tr>
                </tbody>
            </table>
            </>):"Loading"
        }
        </>
    )
}

export default EditProfile