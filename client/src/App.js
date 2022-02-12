import { useState } from 'react';
import './App.css';
import Main from './views/Main';
import Chat from './views/Chat';
import RegisterForm from './views/RegisterForm';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginForm from './views/LoginForm';
import Error401 from './views/Error401';
import Header from './components/Header';
import EditProfile from './views/EditProfile';

function App() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const ToggleLoggedIn = () => {
    console.log("We running?")
    const prevState = isLoggedIn;
    return setLoggedIn(!prevState);
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-header">
          <Header isLoggedIn={isLoggedIn} toggleLoginStatus={ToggleLoggedIn}/>
        </div>
        <Route path={`/register`}>
          <RegisterForm toggleLoginStatus={ToggleLoggedIn}/>
        </Route>
        <Route path={`/login`}>
          <LoginForm toggleLoginStatus={ToggleLoggedIn}/>
        </Route>
        <Route path={'/chat'}>
          <Chat initUserName={userName}/>
        </Route>
        <Route exact path={'/'}>
          <Main lifter={ (name)=> {setUserName(name)} }/>
        </Route>
        <Route exact path={'/edit/user'}>
          <EditProfile/>
        </Route>
        <Route exact path={'/401'}>
          <Error401/>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
