import '../css/Landing.css';
import { useContext } from "react";
import Book from "../components/Book"
import GameList from "../components/player/GameList"
import AWSContext, {loginPath} from "../context/auth/AWSContext"; 
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
const Landing = (props) => {  
  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  return (
    <>
      <NavBar />
      <div className="main">
          {!user.username ? (
              <a href={loginPath}>Login</a>
          ) : (
            <Link to="/test">
            <button>
              Hello and welcome, {user.username} !</button>
            </Link>
          )}
          <div className="gameList">
            <GameList user={user}/>
          </div>
        </div>
        <Book />
        <div className="cloud cloud1" /> 
        <div className="cloud cloud2" /> 
    </>
  );
};

export default Landing;
