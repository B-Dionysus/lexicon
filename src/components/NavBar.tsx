import { useContext } from "react";
import '../css/navBar.css';
import { NavLink } from "react-router-dom";
import { Auth } from 'aws-amplify';

import AWSContext, {loginPath, signUpPath} from "../context/auth/AWSContext"; 
const NavBar = () => {

  const awsContext = useContext(AWSContext); 
  let user=awsContext.user;
  let accessLevel=user.attributes["custom:accessLevel"];
  async function logout(){
    try { 
        await Auth.signOut({global:true});
        awsContext.checkUser();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
  return (
    <nav className="nav">
      
      <NavLink to="/">
        <span  className="">Home Page</span>
      </NavLink>
      
      <NavLink to="/test">
        <span  className="">Secret Page</span>
      </NavLink>
      {!user || !user.username ? 
      (
        <>
          <span className="">
          <a href={loginPath}>Login</a>   
          </span>
          <span className="">
          <a href={signUpPath}>Register</a>   
          </span>  
        </>
      ) : 
      accessLevel>=50 ? (<>
          <NavLink to="admin">Create / Edit Game</NavLink>  
          <span className="navButton" onClick={logout}>Logout (AWS)</span>
        </>) : <span className="navButton" onClick={logout}>Logout (AWS)</span>
      }
    </nav>
  );
};

export default NavBar;
